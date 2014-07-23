package eu.trentorise.game.application.response;

import eu.trentorise.game.application.model.ExternalAction;
import eu.trentorise.game.response.GameResponse;
import java.util.List;

/**
 *
 * @author Luca Piras
 */
public class ExternalActionResponse extends GameResponse {
    
    protected List<ExternalAction> actions;

    public List<ExternalAction> getActions() {
        return actions;
    }

    public void setActions(List<ExternalAction> actions) {
        this.actions = actions;
    }

    @Override
    public String toString() {
        return "ExternalActionResponse{" + "actions=" + actions + '}';
    }
}