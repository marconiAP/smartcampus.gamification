package eu.trentorise.game.core;

import org.apache.commons.lang.StringUtils;
import org.kie.api.event.rule.ObjectDeletedEvent;
import org.kie.api.event.rule.ObjectInsertedEvent;
import org.kie.api.event.rule.ObjectUpdatedEvent;
import org.kie.api.event.rule.RuleRuntimeEventListener;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import eu.trentorise.game.model.BadgeCollectionConcept;
import eu.trentorise.game.model.CustomData;
import eu.trentorise.game.model.PointConcept;
import eu.trentorise.game.notification.BadgeNotification;

public class LoggingRuleListener implements RuleRuntimeEventListener {

	private Logger logger = LoggerFactory.getLogger(LoggingRuleListener.class);

	private String playerId;

	public LoggingRuleListener(String playerId) {
		this.playerId = playerId;
	}

	public LoggingRuleListener() {
	}

	@Override
	public void objectDeleted(ObjectDeletedEvent deleteEvent) {
	}

	@Override
	public void objectInserted(ObjectInsertedEvent insertEvent) {
		Object workingObj = insertEvent.getObject();

		if (workingObj instanceof PointConcept) {
			PointConcept pc = (PointConcept) workingObj;
			logger.info("rule \'{}\' created PointConcept \'{}\' with score {}"
					+ (StringUtils.isBlank(playerId) ? "" : " of player {}"),
					insertEvent.getRule() != null ? insertEvent.getRule()
							.getName() : "-", pc.getName(), pc.getScore(),
					playerId);
		}

		if (workingObj instanceof BadgeCollectionConcept) {
			BadgeCollectionConcept bcc = (BadgeCollectionConcept) workingObj;
			logger.info(
					"rule \'{}\' created BadgeCollectionConcept \'{}\' with badges {}"
							+ (StringUtils.isBlank(playerId) ? ""
									: " of player {}"),
					insertEvent.getRule() != null ? insertEvent.getRule()
							.getName() : "-", bcc.getName(), bcc
							.getBadgeEarned(), playerId);
		}

		if (workingObj instanceof BadgeNotification) {
			BadgeNotification bn = (BadgeNotification) workingObj;
			logger.info(
					"rule \'{}\' created BadgeNotification for badge \'{}\'"
							+ (StringUtils.isBlank(playerId) ? ""
									: " of player {}"),
					insertEvent.getRule() != null ? insertEvent.getRule()
							.getName() : "-", bn.getBadge(), playerId);
		}

		if (workingObj instanceof CustomData) {
			logger.info(
					"rule \'{}\' added CustomData"
							+ (StringUtils.isBlank(playerId) ? ""
									: " of player {}"),
					insertEvent.getRule() != null ? insertEvent.getRule()
							.getName() : "-", playerId);
		}
	}

	@Override
	public void objectUpdated(ObjectUpdatedEvent updateEvent) {
		Object workingObj = updateEvent.getObject();

		if (workingObj instanceof PointConcept) {
			PointConcept pc = (PointConcept) workingObj;
			logger.info("rule \'{}\' updated PointConcept \'{}\' to {}"
					+ (StringUtils.isBlank(playerId) ? "" : " of player {}"),
					updateEvent.getRule() != null ? updateEvent.getRule()
							.getName() : "-", pc.getName(), pc.getScore(),
					playerId);
		}

		if (workingObj instanceof BadgeCollectionConcept) {
			BadgeCollectionConcept bcc = (BadgeCollectionConcept) workingObj;
			logger.info(
					"rule \'{}\' updated BadgeCollectionConcept \'{}\' to {}"
							+ (StringUtils.isBlank(playerId) ? ""
									: " of player {}"),
					updateEvent.getRule() != null ? updateEvent.getRule()
							.getName() : "-", bcc.getName(), bcc
							.getBadgeEarned(), playerId);
		}

		if (workingObj instanceof CustomData) {
			logger.info(
					"rule \'{}\' updated CustomData"
							+ (StringUtils.isBlank(playerId) ? ""
									: " of player {}"),
					updateEvent.getRule() != null ? updateEvent.getRule()
							.getName() : "-", playerId);
		}
	}

}
