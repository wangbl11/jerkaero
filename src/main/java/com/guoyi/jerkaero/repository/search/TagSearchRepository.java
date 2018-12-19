package com.guoyi.jerkaero.repository.search;

import com.guoyi.jerkaero.domain.Setting;
import com.guoyi.jerkaero.domain.Tag;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the Tag entity.
 */
public interface TagSearchRepository extends ElasticsearchRepository<Tag, Long> {
	Page<Tag> findByNameLike(String name,Pageable pageable);
}
