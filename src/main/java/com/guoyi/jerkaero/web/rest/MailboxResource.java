package com.guoyi.jerkaero.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.guoyi.jerkaero.domain.Mailbox;

import com.guoyi.jerkaero.repository.MailboxRepository;
import com.guoyi.jerkaero.repository.search.MailboxSearchRepository;
import com.guoyi.jerkaero.web.rest.errors.BadRequestAlertException;
import com.guoyi.jerkaero.web.rest.util.HeaderUtil;
import com.guoyi.jerkaero.web.rest.util.PaginationUtil;
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
 * REST controller for managing Mailbox.
 */
@RestController
@RequestMapping("/api")
public class MailboxResource {

    private final Logger log = LoggerFactory.getLogger(MailboxResource.class);

    private static final String ENTITY_NAME = "mailbox";

    private final MailboxRepository mailboxRepository;

    private final MailboxSearchRepository mailboxSearchRepository;

    public MailboxResource(MailboxRepository mailboxRepository, MailboxSearchRepository mailboxSearchRepository) {
        this.mailboxRepository = mailboxRepository;
        this.mailboxSearchRepository = mailboxSearchRepository;
    }

    /**
     * POST  /mailboxes : Create a new mailbox.
     *
     * @param mailbox the mailbox to create
     * @return the ResponseEntity with status 201 (Created) and with body the new mailbox, or with status 400 (Bad Request) if the mailbox has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/mailboxes")
    @Timed
    public ResponseEntity<Mailbox> createMailbox(@Valid @RequestBody Mailbox mailbox) throws URISyntaxException {
        log.debug("REST request to save Mailbox : {}", mailbox);
        if (mailbox.getId() != null) {
            throw new BadRequestAlertException("A new mailbox cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Mailbox result = mailboxRepository.save(mailbox);
        mailboxSearchRepository.save(result);
        return ResponseEntity.created(new URI("/api/mailboxes/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /mailboxes : Updates an existing mailbox.
     *
     * @param mailbox the mailbox to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated mailbox,
     * or with status 400 (Bad Request) if the mailbox is not valid,
     * or with status 500 (Internal Server Error) if the mailbox couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/mailboxes")
    @Timed
    public ResponseEntity<Mailbox> updateMailbox(@Valid @RequestBody Mailbox mailbox) throws URISyntaxException {
        log.debug("REST request to update Mailbox : {}", mailbox);
        if (mailbox.getId() == null) {
            return createMailbox(mailbox);
        }
        Mailbox result = mailboxRepository.save(mailbox);
        mailboxSearchRepository.save(result);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, mailbox.getId().toString()))
            .body(result);
    }

    /**
     * GET  /mailboxes : get all the mailboxes.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of mailboxes in body
     */
    @GetMapping("/mailboxes")
    @Timed
    public ResponseEntity<List<Mailbox>> getAllMailboxes(Pageable pageable) {
        log.debug("REST request to get a page of Mailboxes");
        Page<Mailbox> page = mailboxRepository.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/mailboxes");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    @GetMapping("/systemmsgs")
    @Timed
    public ResponseEntity<List<Mailbox>> getSystemMsgs(Pageable pageable) {
        log.debug("REST request to get a page of Mailboxes");
        Page<Mailbox> page = mailboxRepository.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/mailboxes");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }
    
    /**
     * GET  /mailboxes/:id : get the "id" mailbox.
     *
     * @param id the id of the mailbox to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the mailbox, or with status 404 (Not Found)
     */
    @GetMapping("/mailboxes/{id}")
    @Timed
    public ResponseEntity<Mailbox> getMailbox(@PathVariable Long id) {
        log.debug("REST request to get Mailbox : {}", id);
        Mailbox mailbox = mailboxRepository.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(mailbox));
    }

    /**
     * DELETE  /mailboxes/:id : delete the "id" mailbox.
     *
     * @param id the id of the mailbox to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/mailboxes/{id}")
    @Timed
    public ResponseEntity<Void> deleteMailbox(@PathVariable Long id) {
        log.debug("REST request to delete Mailbox : {}", id);
        mailboxRepository.delete(id);
        mailboxSearchRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }

    /**
     * SEARCH  /_search/mailboxes?query=:query : search for the mailbox corresponding
     * to the query.
     *
     * @param query the query of the mailbox search
     * @param pageable the pagination information
     * @return the result of the search
     */
    @GetMapping("/_search/mailboxes")
    @Timed
    public ResponseEntity<List<Mailbox>> searchMailboxes(@RequestParam String query, Pageable pageable) {
        log.debug("REST request to search for a page of Mailboxes for query {}", query);
        Page<Mailbox> page = mailboxSearchRepository.search(queryStringQuery(query), pageable);
        HttpHeaders headers = PaginationUtil.generateSearchPaginationHttpHeaders(query, page, "/api/_search/mailboxes");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

}
