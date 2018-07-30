package com.guoyi.jerkaero.repository.search;

import com.guoyi.jerkaero.domain.Message;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the Message entity.
 */
public interface MessageSearchRepository extends ElasticsearchRepository<Message, Long> {
}
