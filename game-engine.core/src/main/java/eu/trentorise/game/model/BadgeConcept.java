package eu.trentorise.game.model;

public class BadgeConcept extends GameConcept {
	private String icon;

	public BadgeConcept(String name) {
		super(name);
	}

	public String getIcon() {
		return icon;
	}

	public void setIcon(String icon) {
		this.icon = icon;
	}
}