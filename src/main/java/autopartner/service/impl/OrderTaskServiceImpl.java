package autopartner.service.impl;

import autopartner.domain.entity.OrderTask;
import autopartner.repository.OrderTaskRepository;
import autopartner.service.OrderTaskService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

@Repository
@Transactional
@Service("orderTaskService")
public class OrderTaskServiceImpl implements OrderTaskService {

    @Autowired
    private OrderTaskRepository orderTaskRepository;

    @Override
    public Iterable<OrderTask> getByActiveTrue() {
        return orderTaskRepository.findByActiveTrue();
    }

    @Override
    public Iterable<OrderTask> getByOrderAndActiveTrue(Long orderId) {
        return orderTaskRepository.findByOrderAndActiveTrue(orderId);
    }

    @Override
    public OrderTask getOrderTaskById(Long id) {
        return orderTaskRepository.findById(id).get();
    }

    @Override
    public OrderTask saveOrderTask(OrderTask orderTask) {
        return orderTaskRepository.save(orderTask);
    }
}
