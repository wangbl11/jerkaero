package com.guoyi.jerkaero.repository;

import com.guoyi.jerkaero.domain.MessageText;
import com.guoyi.jerkaero.domain.VMessage;
import com.guoyi.jerkaero.domain.enumeration.MessageTypeEnum;

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
   
   @Query(value="select u from MessageText u where u.msgType=0 and u.id not in (select m.messageText.id from Message m where m.recID=?1)")
   Page<MessageText> findPublicNotRead(Long recID,Pageable pageable);
   
   @Query(value="select new VMessage(a.title,a.mcontent,a.createdDate,a.msgStatus,a.msgType, a.sendID, b.recID,a.id as messageID,b.readDate,b.delDate,b.statue,b.recName) from MessageText a left outer join Message b on (a.msgType=0 and b.statue<2 and b.recID=?1 and a.id=b.messageText.id)")
   Page<VMessage> findPublicAll(Long recID,Pageable pageable);
   
   @Query("select u from VMessage u where u.msgType=?1 and u.statue=?2 and u.recID=?3")
   Page<VMessage> findVMessageByStatuses(MessageTypeEnum msgType,Integer statue,Long recID,Pageable pageable);
   
   @Query("select u from VMessage u where u.msgType=1 and u.statue<2 and u.recID=?1")
   Page<VMessage> findAllPrivateVMessages(Long recID,Pageable pageable);
}
