import { ExecutionEnvironment } from '@/types/executor';

import { ScrollToElementTask } from '../task/ScrollElement';

export async function ScrollToElementExecutor(
  environment: ExecutionEnvironment<typeof ScrollToElementTask>
): Promise<boolean> {
  try {
    const selector = environment.getInput('Selector');
    if (!selector) {
      environment.log.error('Input->selector is not defined !!');
    }

    await environment.getPage()!.evaluate((selector) => {
      const element = document.querySelector(selector);
      if (!element) {
        throw new Error('Element not found !!');
      }

      const y = element.getBoundingClientRect().top + window.screenY;
      window.scrollTo({ top: y });
    }, selector);

    return true;
  } catch (error: any) {
    environment.log.error(error.message);
    return false;
  }
}