package com.guoyi.jerkaero.service;

import java.util.List;

import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.guoyi.jerkaero.domain.Message;
import com.guoyi.jerkaero.domain.MessageText;
import com.guoyi.jerkaero.domain.VMessage;
import com.guoyi.jerkaero.repository.MessageRepository;
import com.guoyi.jerkaero.repository.MessageTextRepository;
import com.guoyi.jerkaero.web.rest.vm.MessageTextVM;

@Service
@Transactional
public class MessageService {

	private final MessageTextRepository messageTextRepository;
	private final MessageRepository messageRepository;
	

	public MessageService(MessageTextRepository messageTextRepository, MessageRepository messageRepository) {
		this.messageTextRepository = messageTextRepository;
		this.messageRepository = messageRepository;
	}

	public MessageText create(MessageTextVM messageText) {
		MessageText temp = new MessageText(messageText.getSendID(), messageText.getMsgType(),
				messageText.getMsgStatus(), messageText.getTitle(), messageText.getMcontent());
		MessageText result = messageTextRepository.save(temp);
		Long[] recIDs = messageText.getRecIDs();
		if (recIDs != null)
			for (Long rec : recIDs) {
				if (rec == -1)
					continue;
				Message one = new Message(result.getSendID(), rec, result.getId(), 0);
				messageRepository.save(one);
			}
		return result;
	}
	
//	public MessageTextVM findOne(Long id) {
//		MessageTextVM vm=null;
//		MessageText one=messageTextRepository.findOne(id);
//		if (one==null) return null;
//		List<VMessage> recs=messageRepository.findVByMessageID(id);
//		vm=new MessageTextVM(one);
//		
//		if (recs!=null) {
//			int _size=recs.size();
//			Long[] rets=new Long[_size];
//            String[] names=new String[_size];
//			for (int i=0;i<_size;i++) {
//				VMessage v=recs.get(i);
//				rets[i]=v.getRecID();
//				names[i]=v.getUsername();
//			}
//			vm.setRecIDs(rets);
//			vm.setRecNames(names);
//		}
//		
//		return vm;
//	}

}
