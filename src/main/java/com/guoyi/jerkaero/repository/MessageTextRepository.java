package com.guoyi.jerkaero.repository;

import com.guoyi.jerkaero.domain.MessageText;
import com.guoyi.jerkaero.domain.VMessage;

import org.springframework.stereotype.Repository;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the MessageText entity.
 */
@SuppressWarnings("unused")
@Repository
public interface MessageTextRepository extends JpaRepository<MessageText, Long> {
//   List<MessageText> findAllByRecID(Long recID,Pageable pageable);
//   
//   List<MessageText> findAllByRecIDAndStatueIs(Long recID,Integer status,Pageable pageable);
   
   @Query(value="select u from MessageText u where u.msgType=0 and u.id not in (select m.messageText.id from Message m where m.recID=?1)")
   Page<MessageText> findPublicNotRead(Long recID,Pageable pageable);
   

   @Query("select u from VMessage u where u.msgType=1 and u.statue=1 and u.recID=?1")
   Page<VMessage> findPrivateReaded(Long recID,Pageable pageable);
   
   @Query("select u from VMessage u where u.msgType=1 and u.statue=0 and u.recID=?1")
   Page<VMessage> findPrivateUnRead(Long recID,Pageable pageable);
}
