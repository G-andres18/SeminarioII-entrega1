import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where
} from '@loopback/repository';
import {
  del, get,
  getModelSchemaRef, param, patch, post, put, requestBody,
  response
} from '@loopback/rest';
import {Pots} from '../models';
import {PotsRepository} from '../repositories';

export class PostController {
  constructor(
    @repository(PotsRepository)
    public potsRepository: PotsRepository,
  ) { }

  @post('/pots')
  @response(200, {
    description: 'Pots model instance',
    content: {'application/json': {schema: getModelSchemaRef(Pots)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Pots, {
            title: 'NewPots',
            exclude: ['id'],
          }),
        },
      },
    })
    pots: Omit<Pots, 'id'>,
  ): Promise<Pots> {
    return this.potsRepository.create(pots);
  }

  @get('/pots/count')
  @response(200, {
    description: 'Pots model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Pots) where?: Where<Pots>,
  ): Promise<Count> {
    return this.potsRepository.count(where);
  }

  @get('/pots')
  @response(200, {
    description: 'Array of Pots model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Pots, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Pots) filter?: Filter<Pots>,
  ): Promise<Pots[]> {
    return this.potsRepository.find(filter);
  }

  @patch('/pots')
  @response(200, {
    description: 'Pots PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Pots, {partial: true}),
        },
      },
    })
    pots: Pots,
    @param.where(Pots) where?: Where<Pots>,
  ): Promise<Count> {
    return this.potsRepository.updateAll(pots, where);
  }

  @get('/pots/{id}')
  @response(200, {
    description: 'Pots model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Pots, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Pots, {exclude: 'where'}) filter?: FilterExcludingWhere<Pots>
  ): Promise<Pots> {
    return this.potsRepository.findById(id, filter);
  }

  @patch('/pots/{id}')
  @response(204, {
    description: 'Pots PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Pots, {partial: true}),
        },
      },
    })
    pots: Pots,
  ): Promise<void> {
    await this.potsRepository.updateById(id, pots);
  }

  @put('/pots/{id}')
  @response(204, {
    description: 'Pots PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() pots: Pots,
  ): Promise<void> {
    await this.potsRepository.replaceById(id, pots);
  }

  @del('/pots/{id}')
  @response(204, {
    description: 'Pots DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.potsRepository.deleteById(id);
  }
}
