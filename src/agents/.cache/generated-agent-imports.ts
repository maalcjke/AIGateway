import { Agent } from '../interfaces/agent.abstract';

import * as OpenAIAgentService from '../services/OpenAI.agent';

        export default [
...Object.values(OpenAIAgentService).filter(cls => cls.prototype instanceof Agent)
        ];