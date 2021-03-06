package eu.trentorise.game.repo;

import eu.trentorise.game.model.Team;

public class TeamPersistence extends StatePersistence {

	public TeamPersistence(String gameId, String playerId) {
		super(gameId, playerId);
	}

	public TeamPersistence(Team t) {
		super(t);

		// set specific team data
		metadata.put(Team.NAME_METADATA, t.getName());
		metadata.put(Team.MEMBERS_METADATA, t.getMembers());
	}
}
