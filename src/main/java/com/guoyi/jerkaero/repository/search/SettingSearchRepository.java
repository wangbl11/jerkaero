package com.guoyi.jerkaero.repository.search;

import com.guoyi.jerkaero.domain.Setting;

import java.util.List;

import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the Setting entity.
 */
public interface SettingSearchRepository extends ElasticsearchRepository<Setting, Long> {
	List<Setting> findByNameLike(String name);
}
