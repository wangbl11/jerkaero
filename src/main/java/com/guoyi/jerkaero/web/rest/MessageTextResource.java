package com.guoyi.jerkaero.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.guoyi.jerkaero.domain.MessageText;
import com.guoyi.jerkaero.domain.VMessage;
import com.guoyi.jerkaero.repository.MessageTextRepository;
import com.guoyi.jerkaero.repository.search.MessageTextSearchRepository;
import com.guoyi.jerkaero.service.MessageService;
import com.guoyi.jerkaero.web.rest.errors.BadRequestAlertException;
import com.guoyi.jerkaero.web.rest.util.HeaderUtil;
import com.guoyi.jerkaero.web.rest.util.PaginationUtil;
import com.guoyi.jerkaero.web.rest.vm.MessageTextVM;

import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

import static org.elasticsearch.index.query.QueryBuilders.*;

/**
 * REST controller for managing MessageText.
 */
@RestController
@RequestMapping("/api")
public class MessageTextResource {

	private final Logger log = LoggerFactory.getLogger(MessageTextResource.class);

	private static final String ENTITY_NAME = "messageText";

	private final MessageTextRepository messageTextRepository;

	private final MessageTextSearchRepository messageTextSearchRepository;
	
	private final MessageService messageService;

	public MessageTextResource(MessageTextRepository messageTextRepository,
			MessageTextSearchRepository messageTextSearchRepository,MessageService messageService) {
		this.messageTextRepository = messageTextRepository;
		this.messageTextSearchRepository = messageTextSearchRepository;
		this.messageService=messageService;
	}

	/**
	 * POST /message-texts : Create a new messageText.
	 *
	 * @param messageText
	 *            the messageText to create
	 * @return the ResponseEntity with status 201 (Created) and with body the new
	 *         messageText, or with status 400 (Bad Request) if the messageText has
	 *         already an ID
	 * @throws URISyntaxException
	 *             if the Location URI syntax is incorrect
	 */
//	@PostMapping("/message-texts")
//	@Timed
//	public ResponseEntity<MessageText> createMessageText(@Valid @RequestBody MessageTextVM messageText)
//			throws URISyntaxException {
//		log.debug("REST request to save MessageText : {}", messageText);
//		if (messageText.getId() != null) {
//			throw new BadRequestAlertException("A new messageText cannot already have an ID", ENTITY_NAME, "idexists");
//		}
//
////		MessageText temp = new MessageText(messageText.getSendID(), messageText.getMsgType(),
////				messageText.getMsgStatus(), messageText.getTitle(), messageText.getMcontent());
////		MessageText result = messageTextRepository.save(temp);
////
////		Long[] ids=messageText.getRecIDs();
//		
//		
//		MessageText result=messageService.create(messageText);
//		return ResponseEntity.created(new URI("/api/message-texts/" + result.getId()))
//				.headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString())).body(result);
//	}
	
	@PostMapping("/message-texts")
	@Timed
	public ResponseEntity<MessageText> createMessageText(@Valid @RequestBody MessageText messageText)
			throws URISyntaxException {
		log.debug("REST request to save MessageText : {}", messageText);
		if (messageText.getId() != null) {
			throw new BadRequestAlertException("A new messageText cannot already have an ID", ENTITY_NAME, "idexists");
		}

		MessageText result = messageTextRepository.save(messageText);
		return ResponseEntity.created(new URI("/api/message-texts/" + result.getId()))
				.headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString())).body(result);
	}

	/**
	 * PUT /message-texts : Updates an existing messageText.
	 *
	 * @param messageText
	 *            the messageText to update
	 * @return the ResponseEntity with status 200 (OK) and with body the updated
	 *         messageText, or with status 400 (Bad Request) if the messageText is
	 *         not valid, or with status 500 (Internal Server Error) if the
	 *         messageText couldn't be updated
	 * @throws URISyntaxException
	 *             if the Location URI syntax is incorrect
	 */
//	@PutMapping("/message-texts")
//	@Timed
//	public ResponseEntity<MessageText> updateMessageText(@Valid @RequestBody MessageTextVM messageText)
//			throws URISyntaxException {
//		log.debug("REST request to update MessageText : {}", messageText);
//		if (messageText.getId() == null) {
//			return createMessageText(messageText);
//		}
//		MessageText temp = new MessageText(messageText.getSendID(), messageText.getMsgType(),
//				messageText.getMsgStatus(), messageText.getTitle(), messageText.getMcontent());
//		temp.setId(messageText.getId());
//		MessageText result = messageTextRepository.save(temp);
//		messageTextSearchRepository.save(result);
//		return ResponseEntity.ok()
//				.headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, messageText.getId().toString())).body(result);
//	}

	@PutMapping("/message-texts")
	@Timed
	public ResponseEntity<MessageText> updateMessageText(@Valid @RequestBody MessageText messageText)
			throws URISyntaxException {
		log.debug("REST request to update MessageText : {}", messageText);
		if (messageText.getId() == null) {
			return createMessageText(messageText);
		}
//		MessageText temp = new MessageText(messageText.getSendID(), messageText.getMsgType(),
//				messageText.getMsgStatus(), messageText.getTitle(), messageText.getMcontent());
//		temp.setId(messageText.getId());
		MessageText result = messageTextRepository.save(messageText);
		messageTextSearchRepository.save(result);
		return ResponseEntity.ok()
				.headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, messageText.getId().toString())).body(result);
	}
	
	/**
	 * GET /message-texts : get all the messageTexts.
	 *
	 * @param pageable
	 *            the pagination information
	 * @return the ResponseEntity with status 200 (OK) and the list of messageTexts
	 *         in body
	 */
	@GetMapping("/message-texts")
	@Timed
	public ResponseEntity<List<MessageText>> getAllMessageTexts(Pageable pageable) {
		log.debug("REST request to get a page of MessageTexts");
		Page<MessageText> page = messageTextRepository.findAll(pageable);
		HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/message-texts");
		return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
	}
	
	@GetMapping("/private-unread-messages/{id}")
	@Timed
	public ResponseEntity<List<VMessage>> getAllUnReadMessages(@PathVariable Long id,Pageable pageable) {
		log.debug("REST request to get a page of MessageTexts");
		Page<VMessage> page = messageTextRepository.findPrivateUnRead(id, pageable);
		HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/private-unread-messages");
		return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
	}
	
	@GetMapping("/private-readed-messages/{id}")
	@Timed
	public ResponseEntity<List<VMessage>> getAllReadedMessages(@PathVariable Long id,Pageable pageable) {
		log.debug("REST request to get a page of MessageTexts");
		Page<VMessage> page = messageTextRepository.findPrivateReaded(id, pageable);
		HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/private-readed-messages");
		return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
	}
	
	@GetMapping("/public-unread-messages/{id}")
	@Timed
	public ResponseEntity<List<MessageText>> getPublicUnReadMessages(@PathVariable Long id,Pageable pageable) {
		log.debug("REST request to get a page of MessageTexts");
		Page<MessageText> page = messageTextRepository.findPublicNotRead(id, pageable);
		HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/public-unread-messages");
		return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
	}

	
	/**
	 * GET /message-texts/:id : get the "id" messageText.
	 *
	 * @param id
	 *            the id of the messageText to retrieve
	 * @return the ResponseEntity with status 200 (OK) and with body the
	 *         messageText, or with status 404 (Not Found)
	 */
	@GetMapping("/message-texts/{id}")
	@Timed
	public ResponseEntity<MessageText> getMessageText(@PathVariable Long id) {
		log.debug("REST request to get MessageText : {}", id);
		MessageText messageText = messageTextRepository.findOne(id);
		return ResponseUtil.wrapOrNotFound(Optional.ofNullable(messageText));
	}

//	@GetMapping("/message-texts/{id}")
//	@Timed
//	public ResponseEntity<MessageTextVM> getMessageText(@PathVariable Long id) {
//		log.debug("REST request to get MessageText : {}", id);		
//		MessageTextVM messageText = messageService.findOne(id);
//		
//		return ResponseUtil.wrapOrNotFound(Optional.ofNullable(messageText));
//	}

	/**
	 * DELETE /message-texts/:id : delete the "id" messageText.
	 *
	 * @param id
	 *            the id of the messageText to delete
	 * @return the ResponseEntity with status 200 (OK)
	 */
	@DeleteMapping("/message-texts/{id}")
	@Timed
	public ResponseEntity<Void> deleteMessageText(@PathVariable Long id) {
		log.debug("REST request to delete MessageText : {}", id);
		messageTextRepository.delete(id);
		messageTextSearchRepository.delete(id);
		return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
	}

	/**
	 * SEARCH /_search/message-texts?query=:query : search for the messageText
	 * corresponding to the query.
	 *
	 * @param query
	 *            the query of the messageText search
	 * @param pageable
	 *            the pagination information
	 * @return the result of the search
	 */
	@GetMapping("/_search/message-texts")
	@Timed
	public ResponseEntity<List<MessageText>> searchMessageTexts(@RequestParam String query, Pageable pageable) {
		log.debug("REST request to search for a page of MessageTexts for query {}", query);
		Page<MessageText> page = messageTextSearchRepository.search(queryStringQuery(query), pageable);
		HttpHeaders headers = PaginationUtil.generateSearchPaginationHttpHeaders(query, page,
				"/api/_search/message-texts");
		return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
	}

}
