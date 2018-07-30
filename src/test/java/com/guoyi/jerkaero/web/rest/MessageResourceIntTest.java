package com.guoyi.jerkaero.web.rest;

import com.guoyi.jerkaero.JerkaeroApp;

import com.guoyi.jerkaero.domain.Message;
import com.guoyi.jerkaero.repository.MessageRepository;
import com.guoyi.jerkaero.repository.search.MessageSearchRepository;
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
 * Test class for the MessageResource REST controller.
 *
 * @see MessageResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = JerkaeroApp.class)
public class MessageResourceIntTest {

    private static final Long DEFAULT_SEND_ID = 1L;
    private static final Long UPDATED_SEND_ID = 2L;

    private static final Long DEFAULT_REC_ID = 1L;
    private static final Long UPDATED_REC_ID = 2L;

    private static final Long DEFAULT_MESSAGE_ID = 1L;
    private static final Long UPDATED_MESSAGE_ID = 2L;

    private static final Integer DEFAULT_STATUE = 1;
    private static final Integer UPDATED_STATUE = 2;

    private static final LocalDateTime DEFAULT_READ_DATE = LocalDateTime.ofInstant(Instant.ofEpochMilli(0L), ZoneOffset.UTC);
    private static final LocalDateTime UPDATED_READ_DATE = LocalDateTime.now(ZoneId.systemDefault()).withNano(0);

    @Autowired
    private MessageRepository messageRepository;

    @Autowired
    private MessageSearchRepository messageSearchRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restMessageMockMvc;

    private Message message;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final MessageResource messageResource = new MessageResource(messageRepository, messageSearchRepository);
        this.restMessageMockMvc = MockMvcBuilders.standaloneSetup(messageResource)
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
    public static Message createEntity(EntityManager em) {
        Message message = new Message()
            .sendID(DEFAULT_SEND_ID)
            .recID(DEFAULT_REC_ID)
            .messageID(DEFAULT_MESSAGE_ID)
            .statue(DEFAULT_STATUE)
            .readDate(DEFAULT_READ_DATE);
        return message;
    }

    @Before
    public void initTest() {
        messageSearchRepository.deleteAll();
        message = createEntity(em);
    }

    @Test
    @Transactional
    public void createMessage() throws Exception {
        int databaseSizeBeforeCreate = messageRepository.findAll().size();

        // Create the Message
        restMessageMockMvc.perform(post("/api/messages")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(message)))
            .andExpect(status().isCreated());

        // Validate the Message in the database
        List<Message> messageList = messageRepository.findAll();
        assertThat(messageList).hasSize(databaseSizeBeforeCreate + 1);
        Message testMessage = messageList.get(messageList.size() - 1);
        assertThat(testMessage.getSendID()).isEqualTo(DEFAULT_SEND_ID);
        assertThat(testMessage.getRecID()).isEqualTo(DEFAULT_REC_ID);
        assertThat(testMessage.getMessageID()).isEqualTo(DEFAULT_MESSAGE_ID);
        assertThat(testMessage.getStatue()).isEqualTo(DEFAULT_STATUE);
        assertThat(testMessage.getReadDate()).isEqualTo(DEFAULT_READ_DATE);

        // Validate the Message in Elasticsearch
        Message messageEs = messageSearchRepository.findOne(testMessage.getId());
        assertThat(testMessage.getReadDate()).isEqualTo(testMessage.getReadDate());
        assertThat(messageEs).isEqualToIgnoringGivenFields(testMessage, "readDate");
    }

    @Test
    @Transactional
    public void createMessageWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = messageRepository.findAll().size();

        // Create the Message with an existing ID
        message.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restMessageMockMvc.perform(post("/api/messages")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(message)))
            .andExpect(status().isBadRequest());

        // Validate the Message in the database
        List<Message> messageList = messageRepository.findAll();
        assertThat(messageList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkSendIDIsRequired() throws Exception {
        int databaseSizeBeforeTest = messageRepository.findAll().size();
        // set the field null
        message.setSendID(null);

        // Create the Message, which fails.

        restMessageMockMvc.perform(post("/api/messages")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(message)))
            .andExpect(status().isBadRequest());

        List<Message> messageList = messageRepository.findAll();
        assertThat(messageList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkRecIDIsRequired() throws Exception {
        int databaseSizeBeforeTest = messageRepository.findAll().size();
        // set the field null
        message.setRecID(null);

        // Create the Message, which fails.

        restMessageMockMvc.perform(post("/api/messages")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(message)))
            .andExpect(status().isBadRequest());

        List<Message> messageList = messageRepository.findAll();
        assertThat(messageList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkMessageIDIsRequired() throws Exception {
        int databaseSizeBeforeTest = messageRepository.findAll().size();
        // set the field null
        message.setMessageID(null);

        // Create the Message, which fails.

        restMessageMockMvc.perform(post("/api/messages")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(message)))
            .andExpect(status().isBadRequest());

        List<Message> messageList = messageRepository.findAll();
        assertThat(messageList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkStatueIsRequired() throws Exception {
        int databaseSizeBeforeTest = messageRepository.findAll().size();
        // set the field null
        message.setStatue(null);

        // Create the Message, which fails.

        restMessageMockMvc.perform(post("/api/messages")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(message)))
            .andExpect(status().isBadRequest());

        List<Message> messageList = messageRepository.findAll();
        assertThat(messageList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkReadDateIsRequired() throws Exception {
        int databaseSizeBeforeTest = messageRepository.findAll().size();
        // set the field null
        message.setReadDate(null);

        // Create the Message, which fails.

        restMessageMockMvc.perform(post("/api/messages")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(message)))
            .andExpect(status().isBadRequest());

        List<Message> messageList = messageRepository.findAll();
        assertThat(messageList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllMessages() throws Exception {
        // Initialize the database
        messageRepository.saveAndFlush(message);

        // Get all the messageList
        restMessageMockMvc.perform(get("/api/messages?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(message.getId().intValue())))
            .andExpect(jsonPath("$.[*].sendID").value(hasItem(DEFAULT_SEND_ID.intValue())))
            .andExpect(jsonPath("$.[*].recID").value(hasItem(DEFAULT_REC_ID.intValue())))
            .andExpect(jsonPath("$.[*].messageID").value(hasItem(DEFAULT_MESSAGE_ID.intValue())))
            .andExpect(jsonPath("$.[*].statue").value(hasItem(DEFAULT_STATUE)))
            .andExpect(jsonPath("$.[*].readDate").value(hasItem(sameInstant(DEFAULT_READ_DATE))));
    }

    @Test
    @Transactional
    public void getMessage() throws Exception {
        // Initialize the database
        messageRepository.saveAndFlush(message);

        // Get the message
        restMessageMockMvc.perform(get("/api/messages/{id}", message.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(message.getId().intValue()))
            .andExpect(jsonPath("$.sendID").value(DEFAULT_SEND_ID.intValue()))
            .andExpect(jsonPath("$.recID").value(DEFAULT_REC_ID.intValue()))
            .andExpect(jsonPath("$.messageID").value(DEFAULT_MESSAGE_ID.intValue()))
            .andExpect(jsonPath("$.statue").value(DEFAULT_STATUE))
            .andExpect(jsonPath("$.readDate").value(sameInstant(DEFAULT_READ_DATE)));
    }

    @Test
    @Transactional
    public void getNonExistingMessage() throws Exception {
        // Get the message
        restMessageMockMvc.perform(get("/api/messages/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateMessage() throws Exception {
        // Initialize the database
        messageRepository.saveAndFlush(message);
        messageSearchRepository.save(message);
        int databaseSizeBeforeUpdate = messageRepository.findAll().size();

        // Update the message
        Message updatedMessage = messageRepository.findOne(message.getId());
        // Disconnect from session so that the updates on updatedMessage are not directly saved in db
        em.detach(updatedMessage);
        updatedMessage
            .sendID(UPDATED_SEND_ID)
            .recID(UPDATED_REC_ID)
            .messageID(UPDATED_MESSAGE_ID)
            .statue(UPDATED_STATUE)
            .readDate(UPDATED_READ_DATE);

        restMessageMockMvc.perform(put("/api/messages")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedMessage)))
            .andExpect(status().isOk());

        // Validate the Message in the database
        List<Message> messageList = messageRepository.findAll();
        assertThat(messageList).hasSize(databaseSizeBeforeUpdate);
        Message testMessage = messageList.get(messageList.size() - 1);
        assertThat(testMessage.getSendID()).isEqualTo(UPDATED_SEND_ID);
        assertThat(testMessage.getRecID()).isEqualTo(UPDATED_REC_ID);
        assertThat(testMessage.getMessageID()).isEqualTo(UPDATED_MESSAGE_ID);
        assertThat(testMessage.getStatue()).isEqualTo(UPDATED_STATUE);
        assertThat(testMessage.getReadDate()).isEqualTo(UPDATED_READ_DATE);

        // Validate the Message in Elasticsearch
        Message messageEs = messageSearchRepository.findOne(testMessage.getId());
        assertThat(testMessage.getReadDate()).isEqualTo(testMessage.getReadDate());
        assertThat(messageEs).isEqualToIgnoringGivenFields(testMessage, "readDate");
    }

    @Test
    @Transactional
    public void updateNonExistingMessage() throws Exception {
        int databaseSizeBeforeUpdate = messageRepository.findAll().size();

        // Create the Message

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restMessageMockMvc.perform(put("/api/messages")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(message)))
            .andExpect(status().isCreated());

        // Validate the Message in the database
        List<Message> messageList = messageRepository.findAll();
        assertThat(messageList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteMessage() throws Exception {
        // Initialize the database
        messageRepository.saveAndFlush(message);
        messageSearchRepository.save(message);
        int databaseSizeBeforeDelete = messageRepository.findAll().size();

        // Get the message
        restMessageMockMvc.perform(delete("/api/messages/{id}", message.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate Elasticsearch is empty
        boolean messageExistsInEs = messageSearchRepository.exists(message.getId());
        assertThat(messageExistsInEs).isFalse();

        // Validate the database is empty
        List<Message> messageList = messageRepository.findAll();
        assertThat(messageList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void searchMessage() throws Exception {
        // Initialize the database
        messageRepository.saveAndFlush(message);
        messageSearchRepository.save(message);

        // Search the message
        restMessageMockMvc.perform(get("/api/_search/messages?query=id:" + message.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(message.getId().intValue())))
            .andExpect(jsonPath("$.[*].sendID").value(hasItem(DEFAULT_SEND_ID.intValue())))
            .andExpect(jsonPath("$.[*].recID").value(hasItem(DEFAULT_REC_ID.intValue())))
            .andExpect(jsonPath("$.[*].messageID").value(hasItem(DEFAULT_MESSAGE_ID.intValue())))
            .andExpect(jsonPath("$.[*].statue").value(hasItem(DEFAULT_STATUE)))
            .andExpect(jsonPath("$.[*].readDate").value(hasItem(sameInstant(DEFAULT_READ_DATE))));
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Message.class);
        Message message1 = new Message();
        message1.setId(1L);
        Message message2 = new Message();
        message2.setId(message1.getId());
        assertThat(message1).isEqualTo(message2);
        message2.setId(2L);
        assertThat(message1).isNotEqualTo(message2);
        message1.setId(null);
        assertThat(message1).isNotEqualTo(message2);
    }
}
