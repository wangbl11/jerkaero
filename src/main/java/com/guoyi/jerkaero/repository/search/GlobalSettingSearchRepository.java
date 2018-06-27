package com.guoyi.jerkaero.repository.search;

import com.guoyi.jerkaero.domain.GlobalSetting;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the GlobalSetting entity.
 */
public interface GlobalSettingSearchRepository extends ElasticsearchRepository<GlobalSetting, Long> {
}
