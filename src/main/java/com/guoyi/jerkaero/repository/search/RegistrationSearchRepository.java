package com.guoyi.jerkaero.repository.search;

import com.guoyi.jerkaero.domain.Registration;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the Registration entity.
 */
public interface RegistrationSearchRepository extends ElasticsearchRepository<Registration, Long> {
}
