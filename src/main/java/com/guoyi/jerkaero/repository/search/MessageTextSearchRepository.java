package com.guoyi.jerkaero.repository.search;

import com.guoyi.jerkaero.domain.MessageText;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the MessageText entity.
 */
public interface MessageTextSearchRepository extends ElasticsearchRepository<MessageText, Long> {
}
