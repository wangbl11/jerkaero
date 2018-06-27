package com.guoyi.jerkaero.repository.search;

import com.guoyi.jerkaero.domain.Footprint;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the Footprint entity.
 */
public interface FootprintSearchRepository extends ElasticsearchRepository<Footprint, Long> {
}
