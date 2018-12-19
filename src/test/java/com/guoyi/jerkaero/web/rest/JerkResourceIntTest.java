package com.guoyi.jerkaero.web.rest;

import com.guoyi.jerkaero.JerkaeroApp;

import com.guoyi.jerkaero.domain.Jerk;
import com.guoyi.jerkaero.repository.JerkRepository;
import com.guoyi.jerkaero.repository.search.JerkSearchRepository;
import com.guoyi.jerkaero.web.rest.errors.ExceptionTranslator;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;

import java.time.LocalDateTime;
import java.time.LocalDate;
import java.time.ZoneId;
import java.time.temporal.TemporalUnit;
import java.util.List;

import static com.guoyi.jerkaero.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.guoyi.jerkaero.domain.enumeration.AuthStatusEnum;
/**
 * Test class for the JerkResource REST controller.
 *
 * @see JerkResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = JerkaeroApp.class)
public class JerkResourceIntTest {

    private static final String DEFAULT_USERNAME = "AAAAAAAAAA";
    private static final String UPDATED_USERNAME = "BBBBBBBBBB";

    private static final String DEFAULT_PASSWD = "AAAAAAAAAA";
    private static final String UPDATED_PASSWD = "BBBBBBBBBB";

    private static final String DEFAULT_DISPLAYNAME = "AAAAAAAAAA";
    private static final String UPDATED_DISPLAYNAME = "BBBBBBBBBB";

    private static final AuthStatusEnum DEFAULT_AUTH_STATUS = AuthStatusEnum.A0;
    private static final AuthStatusEnum UPDATED_AUTH_STATUS = AuthStatusEnum.A1;

    private static final LocalDateTime DEFAULT_CREATED_DATE = LocalDateTime.now();
    private static final LocalDateTime UPDATED_CREATED_DATE = DEFAULT_CREATED_DATE.plusSeconds(300);
    private static final LocalDateTime DEFAULT_MODIFIED_DATE = DEFAULT_CREATED_DATE.plusSeconds(600);
    private static final LocalDateTime UPDATED_MODIFIED_DATE = DEFAULT_MODIFIED_DATE.plusSeconds(1200);

    @Autowired
    private JerkRepository jerkRepository;

    @Autowired
    private JerkSearchRepository jerkSearchRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;
    
    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restJerkMockMvc;

    private Jerk jerk;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final JerkResource jerkResource = new JerkResource(jerkRepository, passwordEncoder,jerkSearchRepository);
        this.restJerkMockMvc = MockMvcBuilders.standaloneSetup(jerkResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Jerk createEntity(EntityManager em) {
        Jerk jerk = new Jerk()
            .username(DEFAULT_USERNAME)
            .passwd(DEFAULT_PASSWD)
            .displayname(DEFAULT_DISPLAYNAME)
            .authStatus(DEFAULT_AUTH_STATUS)
            .createdDate(DEFAULT_CREATED_DATE)
            .modifiedDate(DEFAULT_MODIFIED_DATE);
        return jerk;
    }

    @Before
    public void initTest() {
        jerkSearchRepository.deleteAll();
        jerk = createEntity(em);
    }

    @Test
    @Transactional
    public void createJerk() throws Exception {
        int databaseSizeBeforeCreate = jerkRepository.findAll().size();

        // Create the Jerk
        restJerkMockMvc.perform(post("/api/jerks")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(jerk)))
            .andExpect(status().isCreated());

        // Validate the Jerk in the database
        List<Jerk> jerkList = jerkRepository.findAll();
        assertThat(jerkList).hasSize(databaseSizeBeforeCreate + 1);
        Jerk testJerk = jerkList.get(jerkList.size() - 1);
        assertThat(testJerk.getUsername()).isEqualTo(DEFAULT_USERNAME);
        assertThat(testJerk.getPasswd()).isEqualTo(DEFAULT_PASSWD);
        assertThat(testJerk.getDisplayname()).isEqualTo(DEFAULT_DISPLAYNAME);
        assertThat(testJerk.getAuthStatus()).isEqualTo(DEFAULT_AUTH_STATUS);
        assertThat(testJerk.getCreatedDate()).isEqualTo(DEFAULT_CREATED_DATE);
        assertThat(testJerk.getModifiedDate()).isEqualTo(DEFAULT_MODIFIED_DATE);

        // Validate the Jerk in Elasticsearch
        Jerk jerkEs = jerkSearchRepository.findOne(testJerk.getId());
        assertThat(jerkEs).isEqualToIgnoringGivenFields(testJerk);
    }

    @Test
    @Transactional
    public void createJerkWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = jerkRepository.findAll().size();

        // Create the Jerk with an existing ID
        jerk.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restJerkMockMvc.perform(post("/api/jerks")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(jerk)))
            .andExpect(status().isBadRequest());

        // Validate the Jerk in the database
        List<Jerk> jerkList = jerkRepository.findAll();
        assertThat(jerkList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkUsernameIsRequired() throws Exception {
        int databaseSizeBeforeTest = jerkRepository.findAll().size();
        // set the field null
        jerk.setUsername(null);

        // Create the Jerk, which fails.

        restJerkMockMvc.perform(post("/api/jerks")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(jerk)))
            .andExpect(status().isBadRequest());

        List<Jerk> jerkList = jerkRepository.findAll();
        assertThat(jerkList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkPasswdIsRequired() throws Exception {
        int databaseSizeBeforeTest = jerkRepository.findAll().size();
        // set the field null
        jerk.setPasswd(null);

        // Create the Jerk, which fails.

        restJerkMockMvc.perform(post("/api/jerks")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(jerk)))
            .andExpect(status().isBadRequest());

        List<Jerk> jerkList = jerkRepository.findAll();
        assertThat(jerkList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkDisplaynameIsRequired() throws Exception {
        int databaseSizeBeforeTest = jerkRepository.findAll().size();
        // set the field null
        jerk.setDisplayname(null);

        // Create the Jerk, which fails.

        restJerkMockMvc.perform(post("/api/jerks")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(jerk)))
            .andExpect(status().isBadRequest());

        List<Jerk> jerkList = jerkRepository.findAll();
        assertThat(jerkList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkAuthStatusIsRequired() throws Exception {
        int databaseSizeBeforeTest = jerkRepository.findAll().size();
        // set the field null
        jerk.setAuthStatus(null);

        // Create the Jerk, which fails.

        restJerkMockMvc.perform(post("/api/jerks")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(jerk)))
            .andExpect(status().isBadRequest());

        List<Jerk> jerkList = jerkRepository.findAll();
        assertThat(jerkList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkCreatedDateIsRequired() throws Exception {
        int databaseSizeBeforeTest = jerkRepository.findAll().size();
        // set the field null
        jerk.setCreatedDate(null);

        // Create the Jerk, which fails.

        restJerkMockMvc.perform(post("/api/jerks")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(jerk)))
            .andExpect(status().isBadRequest());

        List<Jerk> jerkList = jerkRepository.findAll();
        assertThat(jerkList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllJerks() throws Exception {
        // Initialize the database
        jerkRepository.saveAndFlush(jerk);

        // Get all the jerkList
        restJerkMockMvc.perform(get("/api/jerks?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(jerk.getId().intValue())))
            .andExpect(jsonPath("$.[*].username").value(hasItem(DEFAULT_USERNAME.toString())))
            .andExpect(jsonPath("$.[*].passwd").value(hasItem(DEFAULT_PASSWD.toString())))
            .andExpect(jsonPath("$.[*].displayname").value(hasItem(DEFAULT_DISPLAYNAME.toString())))
            .andExpect(jsonPath("$.[*].authStatus").value(hasItem(DEFAULT_AUTH_STATUS.toString())))
            .andExpect(jsonPath("$.[*].createdDate").value(hasItem(DEFAULT_CREATED_DATE.toString())))
            .andExpect(jsonPath("$.[*].modifiedDate").value(hasItem(DEFAULT_MODIFIED_DATE.toString())));
    }

    @Test
    @Transactional
    public void getJerk() throws Exception {
        // Initialize the database
        jerkRepository.saveAndFlush(jerk);

        // Get the jerk
        restJerkMockMvc.perform(get("/api/jerks/{id}", jerk.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(jerk.getId().intValue()))
            .andExpect(jsonPath("$.username").value(DEFAULT_USERNAME.toString()))
            .andExpect(jsonPath("$.passwd").value(DEFAULT_PASSWD.toString()))
            .andExpect(jsonPath("$.displayname").value(DEFAULT_DISPLAYNAME.toString()))
            .andExpect(jsonPath("$.authStatus").value(DEFAULT_AUTH_STATUS.toString()))
            .andExpect(jsonPath("$.createdDate").value(DEFAULT_CREATED_DATE.toString()))
            .andExpect(jsonPath("$.modifiedDate").value(DEFAULT_MODIFIED_DATE.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingJerk() throws Exception {
        // Get the jerk
        restJerkMockMvc.perform(get("/api/jerks/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateJerk() throws Exception {
        // Initialize the database
        jerkRepository.saveAndFlush(jerk);
        jerkSearchRepository.save(jerk);
        int databaseSizeBeforeUpdate = jerkRepository.findAll().size();

        // Update the jerk
        Jerk updatedJerk = jerkRepository.findOne(jerk.getId());
        // Disconnect from session so that the updates on updatedJerk are not directly saved in db
        em.detach(updatedJerk);
        updatedJerk
            .username(UPDATED_USERNAME)
            .passwd(UPDATED_PASSWD)
            .displayname(UPDATED_DISPLAYNAME)
            .authStatus(UPDATED_AUTH_STATUS)
            .createdDate(UPDATED_CREATED_DATE)
            .modifiedDate(UPDATED_MODIFIED_DATE);

        restJerkMockMvc.perform(put("/api/jerks")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedJerk)))
            .andExpect(status().isOk());

        // Validate the Jerk in the database
        List<Jerk> jerkList = jerkRepository.findAll();
        assertThat(jerkList).hasSize(databaseSizeBeforeUpdate);
        Jerk testJerk = jerkList.get(jerkList.size() - 1);
        assertThat(testJerk.getUsername()).isEqualTo(UPDATED_USERNAME);
        assertThat(testJerk.getPasswd()).isEqualTo(UPDATED_PASSWD);
        assertThat(testJerk.getDisplayname()).isEqualTo(UPDATED_DISPLAYNAME);
        assertThat(testJerk.getAuthStatus()).isEqualTo(UPDATED_AUTH_STATUS);
        assertThat(testJerk.getCreatedDate()).isEqualTo(UPDATED_CREATED_DATE);
        assertThat(testJerk.getModifiedDate()).isEqualTo(UPDATED_MODIFIED_DATE);

        // Validate the Jerk in Elasticsearch
        Jerk jerkEs = jerkSearchRepository.findOne(testJerk.getId());
        assertThat(jerkEs).isEqualToIgnoringGivenFields(testJerk);
    }

    @Test
    @Transactional
    public void updateNonExistingJerk() throws Exception {
        int databaseSizeBeforeUpdate = jerkRepository.findAll().size();

        // Create the Jerk

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restJerkMockMvc.perform(put("/api/jerks")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(jerk)))
            .andExpect(status().isCreated());

        // Validate the Jerk in the database
        List<Jerk> jerkList = jerkRepository.findAll();
        assertThat(jerkList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteJerk() throws Exception {
        // Initialize the database
        jerkRepository.saveAndFlush(jerk);
        jerkSearchRepository.save(jerk);
        int databaseSizeBeforeDelete = jerkRepository.findAll().size();

        // Get the jerk
        restJerkMockMvc.perform(delete("/api/jerks/{id}", jerk.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate Elasticsearch is empty
        boolean jerkExistsInEs = jerkSearchRepository.exists(jerk.getId());
        assertThat(jerkExistsInEs).isFalse();

        // Validate the database is empty
        List<Jerk> jerkList = jerkRepository.findAll();
        assertThat(jerkList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void searchJerk() throws Exception {
        // Initialize the database
        jerkRepository.saveAndFlush(jerk);
        jerkSearchRepository.save(jerk);

        // Search the jerk
        restJerkMockMvc.perform(get("/api/_search/jerks?query=id:" + jerk.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(jerk.getId().intValue())))
            .andExpect(jsonPath("$.[*].username").value(hasItem(DEFAULT_USERNAME.toString())))
            .andExpect(jsonPath("$.[*].passwd").value(hasItem(DEFAULT_PASSWD.toString())))
            .andExpect(jsonPath("$.[*].displayname").value(hasItem(DEFAULT_DISPLAYNAME.toString())))
            .andExpect(jsonPath("$.[*].authStatus").value(hasItem(DEFAULT_AUTH_STATUS.toString())))
            .andExpect(jsonPath("$.[*].createdDate").value(hasItem(DEFAULT_CREATED_DATE.toString())))
            .andExpect(jsonPath("$.[*].modifiedDate").value(hasItem(DEFAULT_MODIFIED_DATE.toString())));
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Jerk.class);
        Jerk jerk1 = new Jerk();
        jerk1.setId(1L);
        Jerk jerk2 = new Jerk();
        jerk2.setId(jerk1.getId());
        assertThat(jerk1).isEqualTo(jerk2);
        jerk2.setId(2L);
        assertThat(jerk1).isNotEqualTo(jerk2);
        jerk1.setId(null);
        assertThat(jerk1).isNotEqualTo(jerk2);
    }
}
