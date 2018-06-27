package com.guoyi.jerkaero.repository.search;

import com.guoyi.jerkaero.domain.Jerk;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the Jerk entity.
 */
public interface JerkSearchRepository extends ElasticsearchRepository<Jerk, Long> {
}
