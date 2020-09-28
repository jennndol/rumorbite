import { Field, InputType, Int, PartialType } from "@nestjs/graphql";

enum OrderType{
    'ASC',
    'DESC'
}

@InputType()
class Pagination {
    @Field(() => Int, { description: 'Limit field' })
    limit: number;

    @Field(() => Int, { description: 'Offset field' })
    offset: number;

    @Field(() => String, { description: 'OrderBy field' })
    orderBy: string;

    @Field(() => String, { description: 'OrderType field' })
    orderType: OrderType;

    @Field(() => String, { description: 'Q field' })
    q: string;
}

@InputType()
export class PaginationParam extends PartialType(Pagination){}