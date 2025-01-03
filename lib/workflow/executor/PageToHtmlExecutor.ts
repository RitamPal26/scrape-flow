import { ExecutionEnvironment } from "@/types/executor";

import { PAGETOHTMLTASK } from "@/lib/workflow/task/PageToHtml";

export async function PageToHtmlExecutor(
  environment: ExecutionEnvironment<typeof PAGETOHTMLTASK>
): Promise<boolean> {
  try {
    const html = await environment.getPage()!.content();
    environment.setOutput("Html", html);

    return true;
  } catch (error: any) {
    environment.log.error(error.message);
    return false;
  }
}
