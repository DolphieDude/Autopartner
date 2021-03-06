package autopartner.repository;

import autopartner.domain.entity.MaterialType;
import org.springframework.data.repository.CrudRepository;

public interface MaterialTypeRepository extends CrudRepository<MaterialType, Long> {
    Iterable<MaterialType> findByActiveTrue();
}