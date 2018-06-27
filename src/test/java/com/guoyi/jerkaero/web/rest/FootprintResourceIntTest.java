package com.guoyi.jerkaero.web.rest;

import com.guoyi.jerkaero.JerkaeroApp;

import com.guoyi.jerkaero.domain.Footprint;
import com.guoyi.jerkaero.repository.FootprintRepository;
import com.guoyi.jerkaero.repository.search.FootprintSearchRepository;
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
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.List;

import static com.guoyi.jerkaero.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the FootprintResource REST controller.
 *
 * @see FootprintResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = JerkaeroApp.class)
public class FootprintResourceIntTest {

    private static final Long DEFAULT_SOURCE_ID = 1L;
    private static final Long UPDATED_SOURCE_ID = 2L;

    private static final Integer DEFAULT_SOURCE_TYPE = 1;
    private static final Integer UPDATED_SOURCE_TYPE = 2;

    private static final Long DEFAULT_READER_ID = 1L;
    private static final Long UPDATED_READER_ID = 2L;

    private static final LocalDate DEFAULT_CREATED_DATE = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_CREATED_DATE = LocalDate.now(ZoneId.systemDefault());

    @Autowired
    private FootprintRepository footprintRepository;

    @Autowired
    private FootprintSearchRepository footprintSearchRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restFootprintMockMvc;

    private Footprint footprint;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final FootprintResource footprintResource = new FootprintResource(footprintRepository, footprintSearchRepository);
        this.restFootprintMockMvc = MockMvcBuilders.standaloneSetup(footprintResource)
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
    public static Footprint createEntity(EntityManager em) {
        Footprint footprint = new Footprint()
            .sourceId(DEFAULT_SOURCE_ID)
            .sourceType(DEFAULT_SOURCE_TYPE)
            .readerId(DEFAULT_READER_ID)
            .createdDate(DEFAULT_CREATED_DATE);
        return footprint;
    }

    @Before
    public void initTest() {
        footprintSearchRepository.deleteAll();
        footprint = createEntity(em);
    }

    @Test
    @Transactional
    public void createFootprint() throws Exception {
        int databaseSizeBeforeCreate = footprintRepository.findAll().size();

        // Create the Footprint
        restFootprintMockMvc.perform(post("/api/footprints")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(footprint)))
            .andExpect(status().isCreated());

        // Validate the Footprint in the database
        List<Footprint> footprintList = footprintRepository.findAll();
        assertThat(footprintList).hasSize(databaseSizeBeforeCreate + 1);
        Footprint testFootprint = footprintList.get(footprintList.size() - 1);
        assertThat(testFootprint.getSourceId()).isEqualTo(DEFAULT_SOURCE_ID);
        assertThat(testFootprint.getSourceType()).isEqualTo(DEFAULT_SOURCE_TYPE);
        assertThat(testFootprint.getReaderId()).isEqualTo(DEFAULT_READER_ID);
        assertThat(testFootprint.getCreatedDate()).isEqualTo(DEFAULT_CREATED_DATE);

        // Validate the Footprint in Elasticsearch
        Footprint footprintEs = footprintSearchRepository.findOne(testFootprint.getId());
        assertThat(footprintEs).isEqualToIgnoringGivenFields(testFootprint);
    }

    @Test
    @Transactional
    public void createFootprintWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = footprintRepository.findAll().size();

        // Create the Footprint with an existing ID
        footprint.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restFootprintMockMvc.perform(post("/api/footprints")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(footprint)))
            .andExpect(status().isBadRequest());

        // Validate the Footprint in the database
        List<Footprint> footprintList = footprintRepository.findAll();
        assertThat(footprintList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkSourceIdIsRequired() throws Exception {
        int databaseSizeBeforeTest = footprintRepository.findAll().size();
        // set the field null
        footprint.setSourceId(null);

        // Create the Footprint, which fails.

        restFootprintMockMvc.perform(post("/api/footprints")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(footprint)))
            .andExpect(status().isBadRequest());

        List<Footprint> footprintList = footprintRepository.findAll();
        assertThat(footprintList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkSourceTypeIsRequired() throws Exception {
        int databaseSizeBeforeTest = footprintRepository.findAll().size();
        // set the field null
        footprint.setSourceType(null);

        // Create the Footprint, which fails.

        restFootprintMockMvc.perform(post("/api/footprints")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(footprint)))
            .andExpect(status().isBadRequest());

        List<Footprint> footprintList = footprintRepository.findAll();
        assertThat(footprintList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkReaderIdIsRequired() throws Exception {
        int databaseSizeBeforeTest = footprintRepository.findAll().size();
        // set the field null
        footprint.setReaderId(null);

        // Create the Footprint, which fails.

        restFootprintMockMvc.perform(post("/api/footprints")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(footprint)))
            .andExpect(status().isBadRequest());

        List<Footprint> footprintList = footprintRepository.findAll();
        assertThat(footprintList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkCreatedDateIsRequired() throws Exception {
        int databaseSizeBeforeTest = footprintRepository.findAll().size();
        // set the field null
        footprint.setCreatedDate(null);

        // Create the Footprint, which fails.

        restFootprintMockMvc.perform(post("/api/footprints")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(footprint)))
            .andExpect(status().isBadRequest());

        List<Footprint> footprintList = footprintRepository.findAll();
        assertThat(footprintList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllFootprints() throws Exception {
        // Initialize the database
        footprintRepository.saveAndFlush(footprint);

        // Get all the footprintList
        restFootprintMockMvc.perform(get("/api/footprints?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(footprint.getId().intValue())))
            .andExpect(jsonPath("$.[*].sourceId").value(hasItem(DEFAULT_SOURCE_ID.intValue())))
            .andExpect(jsonPath("$.[*].sourceType").value(hasItem(DEFAULT_SOURCE_TYPE)))
            .andExpect(jsonPath("$.[*].readerId").value(hasItem(DEFAULT_READER_ID.intValue())))
            .andExpect(jsonPath("$.[*].createdDate").value(hasItem(DEFAULT_CREATED_DATE.toString())));
    }

    @Test
    @Transactional
    public void getFootprint() throws Exception {
        // Initialize the database
        footprintRepository.saveAndFlush(footprint);

        // Get the footprint
        restFootprintMockMvc.perform(get("/api/footprints/{id}", footprint.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(footprint.getId().intValue()))
            .andExpect(jsonPath("$.sourceId").value(DEFAULT_SOURCE_ID.intValue()))
            .andExpect(jsonPath("$.sourceType").value(DEFAULT_SOURCE_TYPE))
            .andExpect(jsonPath("$.readerId").value(DEFAULT_READER_ID.intValue()))
            .andExpect(jsonPath("$.createdDate").value(DEFAULT_CREATED_DATE.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingFootprint() throws Exception {
        // Get the footprint
        restFootprintMockMvc.perform(get("/api/footprints/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateFootprint() throws Exception {
        // Initialize the database
        footprintRepository.saveAndFlush(footprint);
        footprintSearchRepository.save(footprint);
        int databaseSizeBeforeUpdate = footprintRepository.findAll().size();

        // Update the footprint
        Footprint updatedFootprint = footprintRepository.findOne(footprint.getId());
        // Disconnect from session so that the updates on updatedFootprint are not directly saved in db
        em.detach(updatedFootprint);
        updatedFootprint
            .sourceId(UPDATED_SOURCE_ID)
            .sourceType(UPDATED_SOURCE_TYPE)
            .readerId(UPDATED_READER_ID)
            .createdDate(UPDATED_CREATED_DATE);

        restFootprintMockMvc.perform(put("/api/footprints")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedFootprint)))
            .andExpect(status().isOk());

        // Validate the Footprint in the database
        List<Footprint> footprintList = footprintRepository.findAll();
        assertThat(footprintList).hasSize(databaseSizeBeforeUpdate);
        Footprint testFootprint = footprintList.get(footprintList.size() - 1);
        assertThat(testFootprint.getSourceId()).isEqualTo(UPDATED_SOURCE_ID);
        assertThat(testFootprint.getSourceType()).isEqualTo(UPDATED_SOURCE_TYPE);
        assertThat(testFootprint.getReaderId()).isEqualTo(UPDATED_READER_ID);
        assertThat(testFootprint.getCreatedDate()).isEqualTo(UPDATED_CREATED_DATE);

        // Validate the Footprint in Elasticsearch
        Footprint footprintEs = footprintSearchRepository.findOne(testFootprint.getId());
        assertThat(footprintEs).isEqualToIgnoringGivenFields(testFootprint);
    }

    @Test
    @Transactional
    public void updateNonExistingFootprint() throws Exception {
        int databaseSizeBeforeUpdate = footprintRepository.findAll().size();

        // Create the Footprint

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restFootprintMockMvc.perform(put("/api/footprints")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(footprint)))
            .andExpect(status().isCreated());

        // Validate the Footprint in the database
        List<Footprint> footprintList = footprintRepository.findAll();
        assertThat(footprintList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteFootprint() throws Exception {
        // Initialize the database
        footprintRepository.saveAndFlush(footprint);
        footprintSearchRepository.save(footprint);
        int databaseSizeBeforeDelete = footprintRepository.findAll().size();

        // Get the footprint
        restFootprintMockMvc.perform(delete("/api/footprints/{id}", footprint.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate Elasticsearch is empty
        boolean footprintExistsInEs = footprintSearchRepository.exists(footprint.getId());
        assertThat(footprintExistsInEs).isFalse();

        // Validate the database is empty
        List<Footprint> footprintList = footprintRepository.findAll();
        assertThat(footprintList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void searchFootprint() throws Exception {
        // Initialize the database
        footprintRepository.saveAndFlush(footprint);
        footprintSearchRepository.save(footprint);

        // Search the footprint
        restFootprintMockMvc.perform(get("/api/_search/footprints?query=id:" + footprint.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(footprint.getId().intValue())))
            .andExpect(jsonPath("$.[*].sourceId").value(hasItem(DEFAULT_SOURCE_ID.intValue())))
            .andExpect(jsonPath("$.[*].sourceType").value(hasItem(DEFAULT_SOURCE_TYPE)))
            .andExpect(jsonPath("$.[*].readerId").value(hasItem(DEFAULT_READER_ID.intValue())))
            .andExpect(jsonPath("$.[*].createdDate").value(hasItem(DEFAULT_CREATED_DATE.toString())));
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Footprint.class);
        Footprint footprint1 = new Footprint();
        footprint1.setId(1L);
        Footprint footprint2 = new Footprint();
        footprint2.setId(footprint1.getId());
        assertThat(footprint1).isEqualTo(footprint2);
        footprint2.setId(2L);
        assertThat(footprint1).isNotEqualTo(footprint2);
        footprint1.setId(null);
        assertThat(footprint1).isNotEqualTo(footprint2);
    }
}
