import { Agent } from '../interfaces/agent.abstract';
        import * as AnthropicAIAgentService from '../services/AnthropicAI.agent';
import * as OpenAIAgentService from '../services/OpenAI.agent';

        export default [
            ...Object.values(AnthropicAIAgentService).filter(cls => cls.prototype instanceof Agent),
...Object.values(OpenAIAgentService).filter(cls => cls.prototype instanceof Agent)
        ];