package com.guoyi.jerkaero.repository;

import com.guoyi.jerkaero.domain.Message;
import com.guoyi.jerkaero.domain.VMessage;
import org.springframework.stereotype.Repository;

import java.util.List;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the Message entity.
 */
@SuppressWarnings("unused")
@Repository
public interface MessageRepository extends JpaRepository<Message, Long> {
//	List<Message> findByMessageID(Long messageId);
	
//	@Query("select u from VMessage u where u.messageID=?1")
//	List<VMessage> findVByMessageID(Long messageId);
}
