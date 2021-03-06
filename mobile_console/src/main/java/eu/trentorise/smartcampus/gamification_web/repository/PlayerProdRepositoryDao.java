package eu.trentorise.smartcampus.gamification_web.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PlayerProdRepositoryDao extends CrudRepository<PlayerProd, String>{
	
	public PlayerProd findBySocialId(String id);

}
