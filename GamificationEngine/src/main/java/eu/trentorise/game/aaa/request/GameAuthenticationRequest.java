package eu.trentorise.game.aaa.request;

import eu.trentorise.game.aaa.model.User;

/**
 *
 * @author Luca Piras
 */
public class GameAuthenticationRequest {
    
    protected User user;

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }
}