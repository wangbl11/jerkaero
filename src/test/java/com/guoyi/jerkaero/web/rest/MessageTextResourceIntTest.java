package com.guoyi.jerkaero.web.rest;

import com.guoyi.jerkaero.JerkaeroApp;

import com.guoyi.jerkaero.domain.MessageText;
import com.guoyi.jerkaero.domain.enumeration.MessageTypeEnum;
import com.guoyi.jerkaero.repository.MessageTextRepository;
import com.guoyi.jerkaero.repository.search.MessageTextSearchRepository;
import com.guoyi.jerkaero.service.MessageService;
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
 * Test class for the MessageTextResource REST controller.
 *
 * @see MessageTextResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = JerkaeroApp.class)
public class MessageTextResourceIntTest {

    private static final Long DEFAULT_SEND_ID = 1L;
    private static final Long UPDATED_SEND_ID = 2L;

    private static final MessageTypeEnum DEFAULT_TYPE = MessageTypeEnum.BROADCAST;
    private static final MessageTypeEnum UPDATED_TYPE = MessageTypeEnum.PRIVATE;

    private static final String DEFAULT_TITLE = "AAAAAAAAAA";
    private static final String UPDATED_TITLE = "BBBBBBBBBB";

    private static final String DEFAULT_MCONTENT = "AAAAAAAAAA";
    private static final String UPDATED_MCONTENT = "BBBBBBBBBB";

    private static final LocalDateTime DEFAULT_CREATED_DATE = LocalDateTime.ofInstant(Instant.ofEpochMilli(0L), ZoneOffset.UTC);
    private static final LocalDateTime UPDATED_CREATED_DATE = LocalDateTime.now(ZoneId.systemDefault()).withNano(0);

    @Autowired
    private MessageService messageService;
    
    @Autowired
    private MessageTextRepository messageTextRepository;

    @Autowired
    private MessageTextSearchRepository messageTextSearchRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restMessageTextMockMvc;

    private MessageText messageText;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final MessageTextResource messageTextResource = new MessageTextResource(messageTextRepository, messageTextSearchRepository,messageService);
        this.restMessageTextMockMvc = MockMvcBuilders.standaloneSetup(messageTextResource)
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
    public static MessageText createEntity(EntityManager em) {
        MessageText messageText = new MessageText()
            .sendID(DEFAULT_SEND_ID)
            .msgType(DEFAULT_TYPE)
            .title(DEFAULT_TITLE)
            .mcontent(DEFAULT_MCONTENT)
            .createdDate(DEFAULT_CREATED_DATE);
        return messageText;
    }

    @Before
    public void initTest() {
        messageTextSearchRepository.deleteAll();
        messageText = createEntity(em);
    }

    @Test
    @Transactional
    public void createMessageText() throws Exception {
        int databaseSizeBeforeCreate = messageTextRepository.findAll().size();

        // Create the MessageText
        restMessageTextMockMvc.perform(post("/api/message-texts")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(messageText)))
            .andExpect(status().isCreated());

        // Validate the MessageText in the database
        List<MessageText> messageTextList = messageTextRepository.findAll();
        assertThat(messageTextList).hasSize(databaseSizeBeforeCreate + 1);
        MessageText testMessageText = messageTextList.get(messageTextList.size() - 1);
        assertThat(testMessageText.getSendID()).isEqualTo(DEFAULT_SEND_ID);
        assertThat(testMessageText.getMsgType()).isEqualTo(DEFAULT_TYPE);
        assertThat(testMessageText.getTitle()).isEqualTo(DEFAULT_TITLE);
        assertThat(testMessageText.getMcontent()).isEqualTo(DEFAULT_MCONTENT);
        assertThat(testMessageText.getCreatedDate()).isEqualTo(DEFAULT_CREATED_DATE);

        // Validate the MessageText in Elasticsearch
        MessageText messageTextEs = messageTextSearchRepository.findOne(testMessageText.getId());
        assertThat(testMessageText.getCreatedDate()).isEqualTo(testMessageText.getCreatedDate());
        assertThat(messageTextEs).isEqualToIgnoringGivenFields(testMessageText, "createdDate");
    }

    @Test
    @Transactional
    public void createMessageTextWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = messageTextRepository.findAll().size();

        // Create the MessageText with an existing ID
        messageText.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restMessageTextMockMvc.perform(post("/api/message-texts")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(messageText)))
            .andExpect(status().isBadRequest());

        // Validate the MessageText in the database
        List<MessageText> messageTextList = messageTextRepository.findAll();
        assertThat(messageTextList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkSendIDIsRequired() throws Exception {
        int databaseSizeBeforeTest = messageTextRepository.findAll().size();
        // set the field null
        messageText.setSendID(null);

        // Create the MessageText, which fails.

        restMessageTextMockMvc.perform(post("/api/message-texts")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(messageText)))
            .andExpect(status().isBadRequest());

        List<MessageText> messageTextList = messageTextRepository.findAll();
        assertThat(messageTextList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkTypeIsRequired() throws Exception {
        int databaseSizeBeforeTest = messageTextRepository.findAll().size();
        // set the field null
        messageText.setMsgType(null);

        // Create the MessageText, which fails.

        restMessageTextMockMvc.perform(post("/api/message-texts")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(messageText)))
            .andExpect(status().isBadRequest());

        List<MessageText> messageTextList = messageTextRepository.findAll();
        assertThat(messageTextList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkTitleIsRequired() throws Exception {
        int databaseSizeBeforeTest = messageTextRepository.findAll().size();
        // set the field null
        messageText.setTitle(null);

        // Create the MessageText, which fails.

        restMessageTextMockMvc.perform(post("/api/message-texts")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(messageText)))
            .andExpect(status().isBadRequest());

        List<MessageText> messageTextList = messageTextRepository.findAll();
        assertThat(messageTextList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkMcontentIsRequired() throws Exception {
        int databaseSizeBeforeTest = messageTextRepository.findAll().size();
        // set the field null
        messageText.setMcontent(null);

        // Create the MessageText, which fails.

        restMessageTextMockMvc.perform(post("/api/message-texts")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(messageText)))
            .andExpect(status().isBadRequest());

        List<MessageText> messageTextList = messageTextRepository.findAll();
        assertThat(messageTextList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkCreatedDateIsRequired() throws Exception {
        int databaseSizeBeforeTest = messageTextRepository.findAll().size();
        // set the field null
        messageText.setCreatedDate(null);

        // Create the MessageText, which fails.

        restMessageTextMockMvc.perform(post("/api/message-texts")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(messageText)))
            .andExpect(status().isBadRequest());

        List<MessageText> messageTextList = messageTextRepository.findAll();
        assertThat(messageTextList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllMessageTexts() throws Exception {
        // Initialize the database
        messageTextRepository.saveAndFlush(messageText);

        // Get all the messageTextList
        restMessageTextMockMvc.perform(get("/api/message-texts?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(messageText.getId().intValue())))
            .andExpect(jsonPath("$.[*].sendID").value(hasItem(DEFAULT_SEND_ID.intValue())))
            .andExpect(jsonPath("$.[*].type").value(hasItem(DEFAULT_TYPE)))
            .andExpect(jsonPath("$.[*].title").value(hasItem(DEFAULT_TITLE.toString())))
            .andExpect(jsonPath("$.[*].mcontent").value(hasItem(DEFAULT_MCONTENT.toString())))
            .andExpect(jsonPath("$.[*].createdDate").value(hasItem(sameInstant(DEFAULT_CREATED_DATE))));
    }

    @Test
    @Transactional
    public void getMessageText() throws Exception {
        // Initialize the database
        messageTextRepository.saveAndFlush(messageText);

        // Get the messageText
        restMessageTextMockMvc.perform(get("/api/message-texts/{id}", messageText.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(messageText.getId().intValue()))
            .andExpect(jsonPath("$.sendID").value(DEFAULT_SEND_ID.intValue()))
            .andExpect(jsonPath("$.type").value(DEFAULT_TYPE))
            .andExpect(jsonPath("$.title").value(DEFAULT_TITLE.toString()))
            .andExpect(jsonPath("$.mcontent").value(DEFAULT_MCONTENT.toString()))
            .andExpect(jsonPath("$.createdDate").value(sameInstant(DEFAULT_CREATED_DATE)));
    }

    @Test
    @Transactional
    public void getNonExistingMessageText() throws Exception {
        // Get the messageText
        restMessageTextMockMvc.perform(get("/api/message-texts/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateMessageText() throws Exception {
        // Initialize the database
        messageTextRepository.saveAndFlush(messageText);
        messageTextSearchRepository.save(messageText);
        int databaseSizeBeforeUpdate = messageTextRepository.findAll().size();

        // Update the messageText
        MessageText updatedMessageText = messageTextRepository.findOne(messageText.getId());
        // Disconnect from session so that the updates on updatedMessageText are not directly saved in db
        em.detach(updatedMessageText);
        updatedMessageText
            .sendID(UPDATED_SEND_ID)
            .msgType(UPDATED_TYPE)
            .title(UPDATED_TITLE)
            .mcontent(UPDATED_MCONTENT)
            .createdDate(UPDATED_CREATED_DATE);

        restMessageTextMockMvc.perform(put("/api/message-texts")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedMessageText)))
            .andExpect(status().isOk());

        // Validate the MessageText in the database
        List<MessageText> messageTextList = messageTextRepository.findAll();
        assertThat(messageTextList).hasSize(databaseSizeBeforeUpdate);
        MessageText testMessageText = messageTextList.get(messageTextList.size() - 1);
        assertThat(testMessageText.getSendID()).isEqualTo(UPDATED_SEND_ID);
        assertThat(testMessageText.getMsgType()).isEqualTo(UPDATED_TYPE);
        assertThat(testMessageText.getTitle()).isEqualTo(UPDATED_TITLE);
        assertThat(testMessageText.getMcontent()).isEqualTo(UPDATED_MCONTENT);
        assertThat(testMessageText.getCreatedDate()).isEqualTo(UPDATED_CREATED_DATE);

        // Validate the MessageText in Elasticsearch
        MessageText messageTextEs = messageTextSearchRepository.findOne(testMessageText.getId());
        assertThat(testMessageText.getCreatedDate()).isEqualTo(testMessageText.getCreatedDate());
        assertThat(messageTextEs).isEqualToIgnoringGivenFields(testMessageText, "createdDate");
    }

    @Test
    @Transactional
    public void updateNonExistingMessageText() throws Exception {
        int databaseSizeBeforeUpdate = messageTextRepository.findAll().size();

        // Create the MessageText

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restMessageTextMockMvc.perform(put("/api/message-texts")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(messageText)))
            .andExpect(status().isCreated());

        // Validate the MessageText in the database
        List<MessageText> messageTextList = messageTextRepository.findAll();
        assertThat(messageTextList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteMessageText() throws Exception {
        // Initialize the database
        messageTextRepository.saveAndFlush(messageText);
        messageTextSearchRepository.save(messageText);
        int databaseSizeBeforeDelete = messageTextRepository.findAll().size();

        // Get the messageText
        restMessageTextMockMvc.perform(delete("/api/message-texts/{id}", messageText.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate Elasticsearch is empty
        boolean messageTextExistsInEs = messageTextSearchRepository.exists(messageText.getId());
        assertThat(messageTextExistsInEs).isFalse();

        // Validate the database is empty
        List<MessageText> messageTextList = messageTextRepository.findAll();
        assertThat(messageTextList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void searchMessageText() throws Exception {
        // Initialize the database
        messageTextRepository.saveAndFlush(messageText);
        messageTextSearchRepository.save(messageText);

        // Search the messageText
        restMessageTextMockMvc.perform(get("/api/_search/message-texts?query=id:" + messageText.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(messageText.getId().intValue())))
            .andExpect(jsonPath("$.[*].sendID").value(hasItem(DEFAULT_SEND_ID.intValue())))
            .andExpect(jsonPath("$.[*].type").value(hasItem(DEFAULT_TYPE)))
            .andExpect(jsonPath("$.[*].title").value(hasItem(DEFAULT_TITLE.toString())))
            .andExpect(jsonPath("$.[*].mcontent").value(hasItem(DEFAULT_MCONTENT.toString())))
            .andExpect(jsonPath("$.[*].createdDate").value(hasItem(sameInstant(DEFAULT_CREATED_DATE))));
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(MessageText.class);
        MessageText messageText1 = new MessageText();
        messageText1.setId(1L);
        MessageText messageText2 = new MessageText();
        messageText2.setId(messageText1.getId());
        assertThat(messageText1).isEqualTo(messageText2);
        messageText2.setId(2L);
        assertThat(messageText1).isNotEqualTo(messageText2);
        messageText1.setId(null);
        assertThat(messageText1).isNotEqualTo(messageText2);
    }
}
