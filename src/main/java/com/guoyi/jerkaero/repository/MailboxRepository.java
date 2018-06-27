package com.guoyi.jerkaero.repository;

import com.guoyi.jerkaero.domain.Mailbox;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the Mailbox entity.
 */
@SuppressWarnings("unused")
@Repository
public interface MailboxRepository extends JpaRepository<Mailbox, Long> {

}
