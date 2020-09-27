import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { GqlExecutionContext } from "@nestjs/graphql";

export const CurrentUser = createParamDecorator((_data, context: ExecutionContext)  => {
  const ctx = GqlExecutionContext.create(context);
  const { req } = ctx.getContext();
  return req.user;
});