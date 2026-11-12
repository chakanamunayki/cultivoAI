import type { ChatContext, ChatContextualGreetings } from "../../content/types";

/**
 * The chat's opening line for how the visitor arrived. When they came from a
 * modal, the greeting names the service, step or project, and because the
 * greeting is the first turn in the history, the model sees that name too.
 */
export function chatGreeting(
  greetings: ChatContextualGreetings,
  ctx: ChatContext | null | undefined
): string {
  switch (ctx?.type) {
    case "booking":
      return greetings.booking;
    case "story":
      return greetings.story;
    case "service":
      return greetings.service.replace("{service}", ctx.serviceTitle || "");
    case "partnership":
      return ctx.partnershipName && greetings.partnershipNamed
        ? greetings.partnershipNamed.replace("{partnership}", ctx.partnershipName)
        : greetings.partnership;
    case "project":
      return ctx.projectTitle && greetings.project
        ? greetings.project.replace("{project}", ctx.projectTitle)
        : greetings.general;
    case "qualification":
      return greetings.qualification;
    case "impact":
      return greetings.impact;
    default:
      return greetings.general;
  }
}
