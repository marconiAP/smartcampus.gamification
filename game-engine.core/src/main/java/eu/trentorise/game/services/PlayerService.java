/**
 *    Copyright 2015 Fondazione Bruno Kessler - Trento RISE
 *
 *    Licensed under the Apache License, Version 2.0 (the "License");
 *    you may not use this file except in compliance with the License.
 *    You may obtain a copy of the License at
 *
 *        http://www.apache.org/licenses/LICENSE-2.0
 *
 *    Unless required by applicable law or agreed to in writing, software
 *    distributed under the License is distributed on an "AS IS" BASIS,
 *    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *    See the License for the specific language governing permissions and
 *    limitations under the License.
 */

package eu.trentorise.game.services;

import java.util.List;
import java.util.Map;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import eu.trentorise.game.model.PlayerState;
import eu.trentorise.game.model.Team;

@Service
public interface PlayerService {

	public PlayerState loadState(String gameId, String playerId, boolean upsert);

	public Page<PlayerState> loadStates(String gameId, Pageable pageable);

	public List<PlayerState> loadStates(String gameId);

	public Page<PlayerState> loadStates(String gameId, String playerId,
			Pageable pageable);

	public List<PlayerState> loadStates(String gameId, String playerId);

	public PlayerState saveState(PlayerState state);

	public PlayerState updateCustomData(String gameId, String playerId,
			Map<String, Object> data);

	public void deleteState(String gameId, String playerId);

	public Page<String> readPlayers(String gameId, Pageable pageable);

	public List<String> readPlayers(String gameId);

	public Team saveTeam(Team team);

	public List<Team> readTeams(String gameId);

	public Team readTeam(String gameId, String teamId);

	public List<Team> readTeams(String gameId, String playerId);

	public Team addToTeam(String gameId, String teamId, String playerId);

	public Team removeFromTeam(String gameId, String teamId, String playerId);

}
