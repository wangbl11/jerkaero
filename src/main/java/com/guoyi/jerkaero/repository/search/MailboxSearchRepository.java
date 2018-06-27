package com.guoyi.jerkaero.repository.search;

import com.guoyi.jerkaero.domain.Mailbox;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the Mailbox entity.
 */
public interface MailboxSearchRepository extends ElasticsearchRepository<Mailbox, Long> {
}
