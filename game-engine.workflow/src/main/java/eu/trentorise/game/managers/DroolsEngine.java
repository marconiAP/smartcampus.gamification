package eu.trentorise.game.managers;

import java.io.File;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.kie.api.KieServices;
import org.kie.api.builder.KieFileSystem;
import org.kie.api.command.Command;
import org.kie.api.io.KieResources;
import org.kie.api.io.Resource;
import org.kie.api.runtime.ExecutionResults;
import org.kie.api.runtime.KieContainer;
import org.kie.api.runtime.StatelessKieSession;
import org.kie.internal.command.CommandFactory;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

import eu.trentorise.game.model.InputData;
import eu.trentorise.game.model.PlayerState;
import eu.trentorise.game.services.GameEngine;

@Component
public class DroolsEngine implements GameEngine {

	private final Logger logger = LoggerFactory.getLogger(DroolsEngine.class);

	private KieServices kieServices = KieServices.Factory.get();

	public PlayerState execute(String gameId, PlayerState state,
			Map<String, Object> data) {

		loadGameRules(gameId);

		KieContainer kieContainer = kieServices.newKieContainer(kieServices
				.getRepository().getDefaultReleaseId());

		StatelessKieSession kSession = kieContainer.newStatelessKieSession();
		InputData droolsInput = new InputData(data);
		List<Command> cmds = new ArrayList<Command>();
		cmds.add(CommandFactory.newInsert(droolsInput, "input"));
		cmds.add(CommandFactory.newInsert(state, "playerstate"));
		cmds.add(CommandFactory.newFireAllRules());
		ExecutionResults results = kSession.execute(CommandFactory
				.newBatchExecution(cmds));

		PlayerState p = (PlayerState) results.getValue("playerstate");
		logger.info(p.getState().get("FIRST").toString());
		return null;
	}

	private void loadGameRules(String gameId) {
		KieResources res = kieServices.getResources();
		KieFileSystem kfs = kieServices.newKieFileSystem();

		File rulesFolder = new File("src/main/resources/rules/" + gameId);
		if (rulesFolder.exists()) {
			for (File rule : rulesFolder.listFiles()) {
				Resource r1 = res.newFileSystemResource(rule.getAbsolutePath());
				kfs.write(r1);
				logger.info(rule.getAbsolutePath() + " loaded");
			}
			kieServices.newKieBuilder(kfs).buildAll();
			logger.info("Rules repository built");
		} else {
			logger.error(rulesFolder.getAbsolutePath());
		}

	}
}