package com.guoyi.jerkaero.repository;

import com.guoyi.jerkaero.domain.Jerk;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the Jerk entity.
 */
@SuppressWarnings("unused")
@Repository
public interface JerkRepository extends JpaRepository<Jerk, Long> {

}
