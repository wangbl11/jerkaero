package com.guoyi.jerkaero.repository;

import com.guoyi.jerkaero.domain.Footprint;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the Footprint entity.
 */
@SuppressWarnings("unused")
@Repository
public interface FootprintRepository extends JpaRepository<Footprint, Long> {

}
