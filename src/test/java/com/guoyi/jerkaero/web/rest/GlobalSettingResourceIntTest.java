package com.guoyi.jerkaero.web.rest;

import com.guoyi.jerkaero.JerkaeroApp;

import com.guoyi.jerkaero.domain.GlobalSetting;
import com.guoyi.jerkaero.repository.GlobalSettingRepository;
import com.guoyi.jerkaero.repository.search.GlobalSettingSearchRepository;
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
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import java.time.Instant;
import java.time.ZonedDateTime;
import java.time.LocalDateTime;
import java.time.ZoneOffset;
import java.time.ZoneId;
import java.util.List;

import static com.guoyi.jerkaero.web.rest.TestUtil.sameInstant;
import static com.guoyi.jerkaero.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the GlobalSettingResource REST controller.
 *
 * @see GlobalSettingResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = JerkaeroApp.class)
public class GlobalSettingResourceIntTest {

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    private static final Integer DEFAULT_TYPE = 1;
    private static final Integer UPDATED_TYPE = 2;

    private static final String DEFAULT_VALUE = "AAAAAAAAAA";
    private static final String UPDATED_VALUE = "BBBBBBBBBB";

    private static final String DEFAULT_DEFVALUE = "AAAAAAAAAA";
    private static final String UPDATED_DEFVALUE = "BBBBBBBBBB";

    private static final LocalDateTime DEFAULT_CREATED_DATE = LocalDateTime.ofInstant(Instant.ofEpochMilli(0L), ZoneOffset.UTC);
    private static final LocalDateTime UPDATED_CREATED_DATE = LocalDateTime.now(ZoneId.systemDefault()).withNano(0);

    private static final LocalDateTime DEFAULT_MODIFIED_DATE = LocalDateTime.ofInstant(Instant.ofEpochMilli(0L), ZoneOffset.UTC);
    private static final LocalDateTime UPDATED_MODIFIED_DATE = LocalDateTime.now(ZoneId.systemDefault()).withNano(0);

    @Autowired
    private GlobalSettingRepository globalSettingRepository;

    @Autowired
    private GlobalSettingSearchRepository globalSettingSearchRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restGlobalSettingMockMvc;

    private GlobalSetting globalSetting;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final GlobalSettingResource globalSettingResource = new GlobalSettingResource(globalSettingRepository, globalSettingSearchRepository);
        this.restGlobalSettingMockMvc = MockMvcBuilders.standaloneSetup(globalSettingResource)
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
    public static GlobalSetting createEntity(EntityManager em) {
        GlobalSetting globalSetting = new GlobalSetting()
            .name(DEFAULT_NAME)
            .type(DEFAULT_TYPE)
            .value(DEFAULT_VALUE)
            .defvalue(DEFAULT_DEFVALUE)
            .createdDate(DEFAULT_CREATED_DATE)
            .modifiedDate(DEFAULT_MODIFIED_DATE);
        return globalSetting;
    }

    @Before
    public void initTest() {
        globalSettingSearchRepository.deleteAll();
        globalSetting = createEntity(em);
    }

    @Test
    @Transactional
    public void createGlobalSetting() throws Exception {
        int databaseSizeBeforeCreate = globalSettingRepository.findAll().size();

        // Create the GlobalSetting
        restGlobalSettingMockMvc.perform(post("/api/global-settings")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(globalSetting)))
            .andExpect(status().isCreated());

        // Validate the GlobalSetting in the database
        List<GlobalSetting> globalSettingList = globalSettingRepository.findAll();
        assertThat(globalSettingList).hasSize(databaseSizeBeforeCreate + 1);
        GlobalSetting testGlobalSetting = globalSettingList.get(globalSettingList.size() - 1);
        assertThat(testGlobalSetting.getName()).isEqualTo(DEFAULT_NAME);
        assertThat(testGlobalSetting.getType()).isEqualTo(DEFAULT_TYPE);
        assertThat(testGlobalSetting.getValue()).isEqualTo(DEFAULT_VALUE);
        assertThat(testGlobalSetting.getDefvalue()).isEqualTo(DEFAULT_DEFVALUE);
        assertThat(testGlobalSetting.getCreatedDate()).isEqualTo(DEFAULT_CREATED_DATE);
        assertThat(testGlobalSetting.getModifiedDate()).isEqualTo(DEFAULT_MODIFIED_DATE);

        // Validate the GlobalSetting in Elasticsearch
        GlobalSetting globalSettingEs = globalSettingSearchRepository.findOne(testGlobalSetting.getId());
        assertThat(testGlobalSetting.getCreatedDate()).isEqualTo(testGlobalSetting.getCreatedDate());
        assertThat(testGlobalSetting.getModifiedDate()).isEqualTo(testGlobalSetting.getModifiedDate());
        assertThat(globalSettingEs).isEqualToIgnoringGivenFields(testGlobalSetting, "createdDate", "modifiedDate");
    }

    @Test
    @Transactional
    public void createGlobalSettingWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = globalSettingRepository.findAll().size();

        // Create the GlobalSetting with an existing ID
        globalSetting.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restGlobalSettingMockMvc.perform(post("/api/global-settings")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(globalSetting)))
            .andExpect(status().isBadRequest());

        // Validate the GlobalSetting in the database
        List<GlobalSetting> globalSettingList = globalSettingRepository.findAll();
        assertThat(globalSettingList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkNameIsRequired() throws Exception {
        int databaseSizeBeforeTest = globalSettingRepository.findAll().size();
        // set the field null
        globalSetting.setName(null);

        // Create the GlobalSetting, which fails.

        restGlobalSettingMockMvc.perform(post("/api/global-settings")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(globalSetting)))
            .andExpect(status().isBadRequest());

        List<GlobalSetting> globalSettingList = globalSettingRepository.findAll();
        assertThat(globalSettingList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkTypeIsRequired() throws Exception {
        int databaseSizeBeforeTest = globalSettingRepository.findAll().size();
        // set the field null
        globalSetting.setType(null);

        // Create the GlobalSetting, which fails.

        restGlobalSettingMockMvc.perform(post("/api/global-settings")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(globalSetting)))
            .andExpect(status().isBadRequest());

        List<GlobalSetting> globalSettingList = globalSettingRepository.findAll();
        assertThat(globalSettingList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkValueIsRequired() throws Exception {
        int databaseSizeBeforeTest = globalSettingRepository.findAll().size();
        // set the field null
        globalSetting.setValue(null);

        // Create the GlobalSetting, which fails.

        restGlobalSettingMockMvc.perform(post("/api/global-settings")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(globalSetting)))
            .andExpect(status().isBadRequest());

        List<GlobalSetting> globalSettingList = globalSettingRepository.findAll();
        assertThat(globalSettingList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkDefvalueIsRequired() throws Exception {
        int databaseSizeBeforeTest = globalSettingRepository.findAll().size();
        // set the field null
        globalSetting.setDefvalue(null);

        // Create the GlobalSetting, which fails.

        restGlobalSettingMockMvc.perform(post("/api/global-settings")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(globalSetting)))
            .andExpect(status().isBadRequest());

        List<GlobalSetting> globalSettingList = globalSettingRepository.findAll();
        assertThat(globalSettingList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkCreatedDateIsRequired() throws Exception {
        int databaseSizeBeforeTest = globalSettingRepository.findAll().size();
        // set the field null
        globalSetting.setCreatedDate(null);

        // Create the GlobalSetting, which fails.

        restGlobalSettingMockMvc.perform(post("/api/global-settings")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(globalSetting)))
            .andExpect(status().isBadRequest());

        List<GlobalSetting> globalSettingList = globalSettingRepository.findAll();
        assertThat(globalSettingList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllGlobalSettings() throws Exception {
        // Initialize the database
        globalSettingRepository.saveAndFlush(globalSetting);

        // Get all the globalSettingList
        restGlobalSettingMockMvc.perform(get("/api/global-settings?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(globalSetting.getId().intValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME.toString())))
            .andExpect(jsonPath("$.[*].type").value(hasItem(DEFAULT_TYPE)))
            .andExpect(jsonPath("$.[*].value").value(hasItem(DEFAULT_VALUE.toString())))
            .andExpect(jsonPath("$.[*].defvalue").value(hasItem(DEFAULT_DEFVALUE.toString())))
            .andExpect(jsonPath("$.[*].createdDate").value(hasItem(sameInstant(DEFAULT_CREATED_DATE))))
            .andExpect(jsonPath("$.[*].modifiedDate").value(hasItem(sameInstant(DEFAULT_MODIFIED_DATE))));
    }

    @Test
    @Transactional
    public void getGlobalSetting() throws Exception {
        // Initialize the database
        globalSettingRepository.saveAndFlush(globalSetting);

        // Get the globalSetting
        restGlobalSettingMockMvc.perform(get("/api/global-settings/{id}", globalSetting.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(globalSetting.getId().intValue()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME.toString()))
            .andExpect(jsonPath("$.type").value(DEFAULT_TYPE))
            .andExpect(jsonPath("$.value").value(DEFAULT_VALUE.toString()))
            .andExpect(jsonPath("$.defvalue").value(DEFAULT_DEFVALUE.toString()))
            .andExpect(jsonPath("$.createdDate").value(sameInstant(DEFAULT_CREATED_DATE)))
            .andExpect(jsonPath("$.modifiedDate").value(sameInstant(DEFAULT_MODIFIED_DATE)));
    }

    @Test
    @Transactional
    public void getNonExistingGlobalSetting() throws Exception {
        // Get the globalSetting
        restGlobalSettingMockMvc.perform(get("/api/global-settings/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateGlobalSetting() throws Exception {
        // Initialize the database
        globalSettingRepository.saveAndFlush(globalSetting);
        globalSettingSearchRepository.save(globalSetting);
        int databaseSizeBeforeUpdate = globalSettingRepository.findAll().size();

        // Update the globalSetting
        GlobalSetting updatedGlobalSetting = globalSettingRepository.findOne(globalSetting.getId());
        // Disconnect from session so that the updates on updatedGlobalSetting are not directly saved in db
        em.detach(updatedGlobalSetting);
        updatedGlobalSetting
            .name(UPDATED_NAME)
            .type(UPDATED_TYPE)
            .value(UPDATED_VALUE)
            .defvalue(UPDATED_DEFVALUE)
            .createdDate(UPDATED_CREATED_DATE)
            .modifiedDate(UPDATED_MODIFIED_DATE);

        restGlobalSettingMockMvc.perform(put("/api/global-settings")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedGlobalSetting)))
            .andExpect(status().isOk());

        // Validate the GlobalSetting in the database
        List<GlobalSetting> globalSettingList = globalSettingRepository.findAll();
        assertThat(globalSettingList).hasSize(databaseSizeBeforeUpdate);
        GlobalSetting testGlobalSetting = globalSettingList.get(globalSettingList.size() - 1);
        assertThat(testGlobalSetting.getName()).isEqualTo(UPDATED_NAME);
        assertThat(testGlobalSetting.getType()).isEqualTo(UPDATED_TYPE);
        assertThat(testGlobalSetting.getValue()).isEqualTo(UPDATED_VALUE);
        assertThat(testGlobalSetting.getDefvalue()).isEqualTo(UPDATED_DEFVALUE);
        assertThat(testGlobalSetting.getCreatedDate()).isEqualTo(UPDATED_CREATED_DATE);
        assertThat(testGlobalSetting.getModifiedDate()).isEqualTo(UPDATED_MODIFIED_DATE);

        // Validate the GlobalSetting in Elasticsearch
        GlobalSetting globalSettingEs = globalSettingSearchRepository.findOne(testGlobalSetting.getId());
        assertThat(testGlobalSetting.getCreatedDate()).isEqualTo(testGlobalSetting.getCreatedDate());
        assertThat(testGlobalSetting.getModifiedDate()).isEqualTo(testGlobalSetting.getModifiedDate());
        assertThat(globalSettingEs).isEqualToIgnoringGivenFields(testGlobalSetting, "createdDate", "modifiedDate");
    }

    @Test
    @Transactional
    public void updateNonExistingGlobalSetting() throws Exception {
        int databaseSizeBeforeUpdate = globalSettingRepository.findAll().size();

        // Create the GlobalSetting

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restGlobalSettingMockMvc.perform(put("/api/global-settings")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(globalSetting)))
            .andExpect(status().isCreated());

        // Validate the GlobalSetting in the database
        List<GlobalSetting> globalSettingList = globalSettingRepository.findAll();
        assertThat(globalSettingList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteGlobalSetting() throws Exception {
        // Initialize the database
        globalSettingRepository.saveAndFlush(globalSetting);
        globalSettingSearchRepository.save(globalSetting);
        int databaseSizeBeforeDelete = globalSettingRepository.findAll().size();

        // Get the globalSetting
        restGlobalSettingMockMvc.perform(delete("/api/global-settings/{id}", globalSetting.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate Elasticsearch is empty
        boolean globalSettingExistsInEs = globalSettingSearchRepository.exists(globalSetting.getId());
        assertThat(globalSettingExistsInEs).isFalse();

        // Validate the database is empty
        List<GlobalSetting> globalSettingList = globalSettingRepository.findAll();
        assertThat(globalSettingList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void searchGlobalSetting() throws Exception {
        // Initialize the database
        globalSettingRepository.saveAndFlush(globalSetting);
        globalSettingSearchRepository.save(globalSetting);

        // Search the globalSetting
        restGlobalSettingMockMvc.perform(get("/api/_search/global-settings?query=id:" + globalSetting.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(globalSetting.getId().intValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME.toString())))
            .andExpect(jsonPath("$.[*].type").value(hasItem(DEFAULT_TYPE)))
            .andExpect(jsonPath("$.[*].value").value(hasItem(DEFAULT_VALUE.toString())))
            .andExpect(jsonPath("$.[*].defvalue").value(hasItem(DEFAULT_DEFVALUE.toString())))
            .andExpect(jsonPath("$.[*].createdDate").value(hasItem(sameInstant(DEFAULT_CREATED_DATE))))
            .andExpect(jsonPath("$.[*].modifiedDate").value(hasItem(sameInstant(DEFAULT_MODIFIED_DATE))));
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(GlobalSetting.class);
        GlobalSetting globalSetting1 = new GlobalSetting();
        globalSetting1.setId(1L);
        GlobalSetting globalSetting2 = new GlobalSetting();
        globalSetting2.setId(globalSetting1.getId());
        assertThat(globalSetting1).isEqualTo(globalSetting2);
        globalSetting2.setId(2L);
        assertThat(globalSetting1).isNotEqualTo(globalSetting2);
        globalSetting1.setId(null);
        assertThat(globalSetting1).isNotEqualTo(globalSetting2);
    }
}
