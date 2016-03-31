package eu.trentorise.challenge.rest;

import static eu.trentorise.challenge.PropertiesUtil.CONTEXT;
import static eu.trentorise.challenge.PropertiesUtil.GAMEID;
import static eu.trentorise.challenge.PropertiesUtil.HOST;
import static eu.trentorise.challenge.PropertiesUtil.INSERT_CONTEXT;
import static eu.trentorise.challenge.PropertiesUtil.SAVE_ITINERARY;
import static eu.trentorise.challenge.PropertiesUtil.get;
import static org.junit.Assert.assertTrue;

import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.commons.io.IOUtils;
import org.junit.Before;
import org.junit.Test;

import eu.trentorise.game.challenges.rest.Content;
import eu.trentorise.game.challenges.rest.ExecutionDataDTO;
import eu.trentorise.game.challenges.rest.GamificationEngineRestFacade;
import eu.trentorise.game.challenges.rest.RuleDto;
import eu.trentorise.game.challenges.util.ConverterUtil;
import eu.trentorise.game.challenges.util.JourneyData;

public class RestTest {

    private GamificationEngineRestFacade facade;
    private GamificationEngineRestFacade insertFacade;

    @Before
    public void setup() {
	facade = new GamificationEngineRestFacade(get(HOST) + get(CONTEXT));
	insertFacade = new GamificationEngineRestFacade(get(HOST)
		+ get(INSERT_CONTEXT));
    }

    @Test
    public void gameReadGameStateTest() {
	List<Content> result = facade.readGameState(get(GAMEID));
	assertTrue(!result.isEmpty());
    }

    @Test
    public void gameInsertRuleTest() {
	// define rule
	RuleDto rule = new RuleDto();
	rule.setContent("rule \"ss\" when then System.out.println(\"LOGGO\"");
	rule.setName("sampleRule");
	// insert rule
	RuleDto result = insertFacade.insertGameRule(get(GAMEID), rule);
	assertTrue(!result.getId().isEmpty());
	// delete inserted rule
	boolean res = insertFacade.deleteGameRule(get(GAMEID), result.getId());
	assertTrue(res);
    }

    @Test
    public void saveItineraryTest() {
	GamificationEngineRestFacade facade = new GamificationEngineRestFacade(
		get(HOST) + get(CONTEXT));
	ExecutionDataDTO input = new ExecutionDataDTO();
	input.setActionId(get(SAVE_ITINERARY));
	input.setPlayerId("1");
	input.setGameId(get(GAMEID));
	Map<String, Object> data = new HashMap<String, Object>();
	data.put("bikeDistance", Double.valueOf(1.0d));
	input.setData(data);
	boolean result = facade.saveItinerary(input);

	assertTrue(result);
    }

    @Test
    public void saveUsersItineraryLoadedFromFile() throws IOException {
	// create input
	String ref = "savedtrips1.json";

	// read all lines from file
	List<String> lines = IOUtils.readLines(Thread.currentThread()
		.getContextClassLoader().getResourceAsStream(ref));

	for (String line : lines) {
	    JourneyData jd = ConverterUtil.extractJourneyData(line);
	    ExecutionDataDTO input = new ExecutionDataDTO();
	    input.setActionId(get(SAVE_ITINERARY));
	    input.setPlayerId(jd.getUserId());
	    input.setGameId(get(GAMEID));
	    input.setData(jd.getData());
	    boolean result = facade.saveItinerary(input);

	    assertTrue(result);
	}
    }

}
