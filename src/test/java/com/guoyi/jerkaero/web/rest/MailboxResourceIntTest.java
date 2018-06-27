package com.guoyi.jerkaero.web.rest;

import com.guoyi.jerkaero.JerkaeroApp;

import com.guoyi.jerkaero.domain.Mailbox;
import com.guoyi.jerkaero.repository.MailboxRepository;
import com.guoyi.jerkaero.repository.search.MailboxSearchRepository;
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
 * Test class for the MailboxResource REST controller.
 *
 * @see MailboxResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = JerkaeroApp.class)
public class MailboxResourceIntTest {

    private static final Long DEFAULT_SEND_ID = 1L;
    private static final Long UPDATED_SEND_ID = 2L;

    private static final Long DEFAULT_RECEIVER_ID = 1L;
    private static final Long UPDATED_RECEIVER_ID = 2L;

    private static final Integer DEFAULT_MSG_TYPE = 1;
    private static final Integer UPDATED_MSG_TYPE = 2;

    private static final String DEFAULT_TITLE = "AAAAAAAAAA";
    private static final String UPDATED_TITLE = "BBBBBBBBBB";

    private static final String DEFAULT_MCONTENT = "AAAAAAAAAA";
    private static final String UPDATED_MCONTENT = "BBBBBBBBBB";

    private static final Long DEFAULT_SOURCE_ID = 1L;
    private static final Long UPDATED_SOURCE_ID = 2L;

    private static final LocalDate DEFAULT_CREATED_DATE = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_CREATED_DATE = LocalDate.now(ZoneId.systemDefault());

    private static final LocalDate DEFAULT_READ_DATE = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_READ_DATE = LocalDate.now(ZoneId.systemDefault());

    private static final Integer DEFAULT_ANONYMOUS = 1;
    private static final Integer UPDATED_ANONYMOUS = 2;

    @Autowired
    private MailboxRepository mailboxRepository;

    @Autowired
    private MailboxSearchRepository mailboxSearchRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restMailboxMockMvc;

    private Mailbox mailbox;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final MailboxResource mailboxResource = new MailboxResource(mailboxRepository, mailboxSearchRepository);
        this.restMailboxMockMvc = MockMvcBuilders.standaloneSetup(mailboxResource)
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
    public static Mailbox createEntity(EntityManager em) {
        Mailbox mailbox = new Mailbox()
            .sendId(DEFAULT_SEND_ID)
            .receiverId(DEFAULT_RECEIVER_ID)
            .msgType(DEFAULT_MSG_TYPE)
            .title(DEFAULT_TITLE)
            .mcontent(DEFAULT_MCONTENT)
            .sourceId(DEFAULT_SOURCE_ID)
            .createdDate(DEFAULT_CREATED_DATE)
            .readDate(DEFAULT_READ_DATE)
            .anonymous(DEFAULT_ANONYMOUS);
        return mailbox;
    }

    @Before
    public void initTest() {
        mailboxSearchRepository.deleteAll();
        mailbox = createEntity(em);
    }

    @Test
    @Transactional
    public void createMailbox() throws Exception {
        int databaseSizeBeforeCreate = mailboxRepository.findAll().size();

        // Create the Mailbox
        restMailboxMockMvc.perform(post("/api/mailboxes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(mailbox)))
            .andExpect(status().isCreated());

        // Validate the Mailbox in the database
        List<Mailbox> mailboxList = mailboxRepository.findAll();
        assertThat(mailboxList).hasSize(databaseSizeBeforeCreate + 1);
        Mailbox testMailbox = mailboxList.get(mailboxList.size() - 1);
        assertThat(testMailbox.getSendId()).isEqualTo(DEFAULT_SEND_ID);
        assertThat(testMailbox.getReceiverId()).isEqualTo(DEFAULT_RECEIVER_ID);
        assertThat(testMailbox.getMsgType()).isEqualTo(DEFAULT_MSG_TYPE);
        assertThat(testMailbox.getTitle()).isEqualTo(DEFAULT_TITLE);
        assertThat(testMailbox.getMcontent()).isEqualTo(DEFAULT_MCONTENT);
        assertThat(testMailbox.getSourceId()).isEqualTo(DEFAULT_SOURCE_ID);
        assertThat(testMailbox.getCreatedDate()).isEqualTo(DEFAULT_CREATED_DATE);
        assertThat(testMailbox.getReadDate()).isEqualTo(DEFAULT_READ_DATE);
        assertThat(testMailbox.getAnonymous()).isEqualTo(DEFAULT_ANONYMOUS);

        // Validate the Mailbox in Elasticsearch
        Mailbox mailboxEs = mailboxSearchRepository.findOne(testMailbox.getId());
        assertThat(mailboxEs).isEqualToIgnoringGivenFields(testMailbox);
    }

    @Test
    @Transactional
    public void createMailboxWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = mailboxRepository.findAll().size();

        // Create the Mailbox with an existing ID
        mailbox.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restMailboxMockMvc.perform(post("/api/mailboxes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(mailbox)))
            .andExpect(status().isBadRequest());

        // Validate the Mailbox in the database
        List<Mailbox> mailboxList = mailboxRepository.findAll();
        assertThat(mailboxList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkSendIdIsRequired() throws Exception {
        int databaseSizeBeforeTest = mailboxRepository.findAll().size();
        // set the field null
        mailbox.setSendId(null);

        // Create the Mailbox, which fails.

        restMailboxMockMvc.perform(post("/api/mailboxes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(mailbox)))
            .andExpect(status().isBadRequest());

        List<Mailbox> mailboxList = mailboxRepository.findAll();
        assertThat(mailboxList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkReceiverIdIsRequired() throws Exception {
        int databaseSizeBeforeTest = mailboxRepository.findAll().size();
        // set the field null
        mailbox.setReceiverId(null);

        // Create the Mailbox, which fails.

        restMailboxMockMvc.perform(post("/api/mailboxes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(mailbox)))
            .andExpect(status().isBadRequest());

        List<Mailbox> mailboxList = mailboxRepository.findAll();
        assertThat(mailboxList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkMsgTypeIsRequired() throws Exception {
        int databaseSizeBeforeTest = mailboxRepository.findAll().size();
        // set the field null
        mailbox.setMsgType(null);

        // Create the Mailbox, which fails.

        restMailboxMockMvc.perform(post("/api/mailboxes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(mailbox)))
            .andExpect(status().isBadRequest());

        List<Mailbox> mailboxList = mailboxRepository.findAll();
        assertThat(mailboxList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkTitleIsRequired() throws Exception {
        int databaseSizeBeforeTest = mailboxRepository.findAll().size();
        // set the field null
        mailbox.setTitle(null);

        // Create the Mailbox, which fails.

        restMailboxMockMvc.perform(post("/api/mailboxes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(mailbox)))
            .andExpect(status().isBadRequest());

        List<Mailbox> mailboxList = mailboxRepository.findAll();
        assertThat(mailboxList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkMcontentIsRequired() throws Exception {
        int databaseSizeBeforeTest = mailboxRepository.findAll().size();
        // set the field null
        mailbox.setMcontent(null);

        // Create the Mailbox, which fails.

        restMailboxMockMvc.perform(post("/api/mailboxes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(mailbox)))
            .andExpect(status().isBadRequest());

        List<Mailbox> mailboxList = mailboxRepository.findAll();
        assertThat(mailboxList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkSourceIdIsRequired() throws Exception {
        int databaseSizeBeforeTest = mailboxRepository.findAll().size();
        // set the field null
        mailbox.setSourceId(null);

        // Create the Mailbox, which fails.

        restMailboxMockMvc.perform(post("/api/mailboxes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(mailbox)))
            .andExpect(status().isBadRequest());

        List<Mailbox> mailboxList = mailboxRepository.findAll();
        assertThat(mailboxList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkCreatedDateIsRequired() throws Exception {
        int databaseSizeBeforeTest = mailboxRepository.findAll().size();
        // set the field null
        mailbox.setCreatedDate(null);

        // Create the Mailbox, which fails.

        restMailboxMockMvc.perform(post("/api/mailboxes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(mailbox)))
            .andExpect(status().isBadRequest());

        List<Mailbox> mailboxList = mailboxRepository.findAll();
        assertThat(mailboxList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkReadDateIsRequired() throws Exception {
        int databaseSizeBeforeTest = mailboxRepository.findAll().size();
        // set the field null
        mailbox.setReadDate(null);

        // Create the Mailbox, which fails.

        restMailboxMockMvc.perform(post("/api/mailboxes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(mailbox)))
            .andExpect(status().isBadRequest());

        List<Mailbox> mailboxList = mailboxRepository.findAll();
        assertThat(mailboxList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkAnonymousIsRequired() throws Exception {
        int databaseSizeBeforeTest = mailboxRepository.findAll().size();
        // set the field null
        mailbox.setAnonymous(null);

        // Create the Mailbox, which fails.

        restMailboxMockMvc.perform(post("/api/mailboxes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(mailbox)))
            .andExpect(status().isBadRequest());

        List<Mailbox> mailboxList = mailboxRepository.findAll();
        assertThat(mailboxList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllMailboxes() throws Exception {
        // Initialize the database
        mailboxRepository.saveAndFlush(mailbox);

        // Get all the mailboxList
        restMailboxMockMvc.perform(get("/api/mailboxes?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(mailbox.getId().intValue())))
            .andExpect(jsonPath("$.[*].sendId").value(hasItem(DEFAULT_SEND_ID.intValue())))
            .andExpect(jsonPath("$.[*].receiverId").value(hasItem(DEFAULT_RECEIVER_ID.intValue())))
            .andExpect(jsonPath("$.[*].msgType").value(hasItem(DEFAULT_MSG_TYPE)))
            .andExpect(jsonPath("$.[*].title").value(hasItem(DEFAULT_TITLE.toString())))
            .andExpect(jsonPath("$.[*].mcontent").value(hasItem(DEFAULT_MCONTENT.toString())))
            .andExpect(jsonPath("$.[*].sourceId").value(hasItem(DEFAULT_SOURCE_ID.intValue())))
            .andExpect(jsonPath("$.[*].createdDate").value(hasItem(DEFAULT_CREATED_DATE.toString())))
            .andExpect(jsonPath("$.[*].readDate").value(hasItem(DEFAULT_READ_DATE.toString())))
            .andExpect(jsonPath("$.[*].anonymous").value(hasItem(DEFAULT_ANONYMOUS)));
    }

    @Test
    @Transactional
    public void getMailbox() throws Exception {
        // Initialize the database
        mailboxRepository.saveAndFlush(mailbox);

        // Get the mailbox
        restMailboxMockMvc.perform(get("/api/mailboxes/{id}", mailbox.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(mailbox.getId().intValue()))
            .andExpect(jsonPath("$.sendId").value(DEFAULT_SEND_ID.intValue()))
            .andExpect(jsonPath("$.receiverId").value(DEFAULT_RECEIVER_ID.intValue()))
            .andExpect(jsonPath("$.msgType").value(DEFAULT_MSG_TYPE))
            .andExpect(jsonPath("$.title").value(DEFAULT_TITLE.toString()))
            .andExpect(jsonPath("$.mcontent").value(DEFAULT_MCONTENT.toString()))
            .andExpect(jsonPath("$.sourceId").value(DEFAULT_SOURCE_ID.intValue()))
            .andExpect(jsonPath("$.createdDate").value(DEFAULT_CREATED_DATE.toString()))
            .andExpect(jsonPath("$.readDate").value(DEFAULT_READ_DATE.toString()))
            .andExpect(jsonPath("$.anonymous").value(DEFAULT_ANONYMOUS));
    }

    @Test
    @Transactional
    public void getNonExistingMailbox() throws Exception {
        // Get the mailbox
        restMailboxMockMvc.perform(get("/api/mailboxes/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateMailbox() throws Exception {
        // Initialize the database
        mailboxRepository.saveAndFlush(mailbox);
        mailboxSearchRepository.save(mailbox);
        int databaseSizeBeforeUpdate = mailboxRepository.findAll().size();

        // Update the mailbox
        Mailbox updatedMailbox = mailboxRepository.findOne(mailbox.getId());
        // Disconnect from session so that the updates on updatedMailbox are not directly saved in db
        em.detach(updatedMailbox);
        updatedMailbox
            .sendId(UPDATED_SEND_ID)
            .receiverId(UPDATED_RECEIVER_ID)
            .msgType(UPDATED_MSG_TYPE)
            .title(UPDATED_TITLE)
            .mcontent(UPDATED_MCONTENT)
            .sourceId(UPDATED_SOURCE_ID)
            .createdDate(UPDATED_CREATED_DATE)
            .readDate(UPDATED_READ_DATE)
            .anonymous(UPDATED_ANONYMOUS);

        restMailboxMockMvc.perform(put("/api/mailboxes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedMailbox)))
            .andExpect(status().isOk());

        // Validate the Mailbox in the database
        List<Mailbox> mailboxList = mailboxRepository.findAll();
        assertThat(mailboxList).hasSize(databaseSizeBeforeUpdate);
        Mailbox testMailbox = mailboxList.get(mailboxList.size() - 1);
        assertThat(testMailbox.getSendId()).isEqualTo(UPDATED_SEND_ID);
        assertThat(testMailbox.getReceiverId()).isEqualTo(UPDATED_RECEIVER_ID);
        assertThat(testMailbox.getMsgType()).isEqualTo(UPDATED_MSG_TYPE);
        assertThat(testMailbox.getTitle()).isEqualTo(UPDATED_TITLE);
        assertThat(testMailbox.getMcontent()).isEqualTo(UPDATED_MCONTENT);
        assertThat(testMailbox.getSourceId()).isEqualTo(UPDATED_SOURCE_ID);
        assertThat(testMailbox.getCreatedDate()).isEqualTo(UPDATED_CREATED_DATE);
        assertThat(testMailbox.getReadDate()).isEqualTo(UPDATED_READ_DATE);
        assertThat(testMailbox.getAnonymous()).isEqualTo(UPDATED_ANONYMOUS);

        // Validate the Mailbox in Elasticsearch
        Mailbox mailboxEs = mailboxSearchRepository.findOne(testMailbox.getId());
        assertThat(mailboxEs).isEqualToIgnoringGivenFields(testMailbox);
    }

    @Test
    @Transactional
    public void updateNonExistingMailbox() throws Exception {
        int databaseSizeBeforeUpdate = mailboxRepository.findAll().size();

        // Create the Mailbox

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restMailboxMockMvc.perform(put("/api/mailboxes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(mailbox)))
            .andExpect(status().isCreated());

        // Validate the Mailbox in the database
        List<Mailbox> mailboxList = mailboxRepository.findAll();
        assertThat(mailboxList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteMailbox() throws Exception {
        // Initialize the database
        mailboxRepository.saveAndFlush(mailbox);
        mailboxSearchRepository.save(mailbox);
        int databaseSizeBeforeDelete = mailboxRepository.findAll().size();

        // Get the mailbox
        restMailboxMockMvc.perform(delete("/api/mailboxes/{id}", mailbox.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate Elasticsearch is empty
        boolean mailboxExistsInEs = mailboxSearchRepository.exists(mailbox.getId());
        assertThat(mailboxExistsInEs).isFalse();

        // Validate the database is empty
        List<Mailbox> mailboxList = mailboxRepository.findAll();
        assertThat(mailboxList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void searchMailbox() throws Exception {
        // Initialize the database
        mailboxRepository.saveAndFlush(mailbox);
        mailboxSearchRepository.save(mailbox);

        // Search the mailbox
        restMailboxMockMvc.perform(get("/api/_search/mailboxes?query=id:" + mailbox.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(mailbox.getId().intValue())))
            .andExpect(jsonPath("$.[*].sendId").value(hasItem(DEFAULT_SEND_ID.intValue())))
            .andExpect(jsonPath("$.[*].receiverId").value(hasItem(DEFAULT_RECEIVER_ID.intValue())))
            .andExpect(jsonPath("$.[*].msgType").value(hasItem(DEFAULT_MSG_TYPE)))
            .andExpect(jsonPath("$.[*].title").value(hasItem(DEFAULT_TITLE.toString())))
            .andExpect(jsonPath("$.[*].mcontent").value(hasItem(DEFAULT_MCONTENT.toString())))
            .andExpect(jsonPath("$.[*].sourceId").value(hasItem(DEFAULT_SOURCE_ID.intValue())))
            .andExpect(jsonPath("$.[*].createdDate").value(hasItem(DEFAULT_CREATED_DATE.toString())))
            .andExpect(jsonPath("$.[*].readDate").value(hasItem(DEFAULT_READ_DATE.toString())))
            .andExpect(jsonPath("$.[*].anonymous").value(hasItem(DEFAULT_ANONYMOUS)));
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Mailbox.class);
        Mailbox mailbox1 = new Mailbox();
        mailbox1.setId(1L);
        Mailbox mailbox2 = new Mailbox();
        mailbox2.setId(mailbox1.getId());
        assertThat(mailbox1).isEqualTo(mailbox2);
        mailbox2.setId(2L);
        assertThat(mailbox1).isNotEqualTo(mailbox2);
        mailbox1.setId(null);
        assertThat(mailbox1).isNotEqualTo(mailbox2);
    }
}
