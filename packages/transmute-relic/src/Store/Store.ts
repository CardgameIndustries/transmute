import { UnsafeEventStore } from '../types/UnsafeEventStore'
import { EventStore } from '../types/EventStore'
import { W3 } from 'soltsice'

import { Utils } from '../Utils'
import * as Adapter from './Adapter'

export namespace Store {
  export type GenericEventStore = UnsafeEventStore | EventStore

  export enum Types {
    UnsafeEventStore,
    EventStore
  }

  /**
   * Store typeClassMapper
   */
  export const typeClassMapper = (name: Types) => {
    switch (name) {
      case Types.UnsafeEventStore:
        return UnsafeEventStore
      default:
        return EventStore
    }
  }

  /**
   * Store eventCount
   */
  export const eventCount = async (store: GenericEventStore, web3: any, fromAddress: string) => {
    W3.Default = web3
    let countBigNumber = await store.eventCount(W3.TC.txParamsDefaultDeploy(fromAddress))
    return countBigNumber.toNumber()
  }

  /**
   * Store readFSA
   */
  export const readFSA = async (
    store: GenericEventStore,
    adapter: Adapter.Adapter,
    web3: any,
    fromAddress: string,
    eventId: number
  ) => {
    W3.Default = web3

    let solidityValues: any = await store.readEvent(
      eventId,
      W3.TC.txParamsDefaultDeploy(fromAddress)
    )

    let esEvent = await adapter.valuesToEsEvent(
      solidityValues[0],
      solidityValues[1],
      solidityValues[2],
      solidityValues[3],
      solidityValues[4],
      solidityValues[5],
      solidityValues[6],
      solidityValues[7]
    )

    return adapter.eventMap.EsEvent(esEvent)
  }

  /**
   * Store writeFSA
   */
  export const writeFSA = async (
    store: GenericEventStore,
    adapter: Adapter.Adapter,
    web3: any,
    fromAddress: string,
    event: Utils.IFSA
  ): Promise<Utils.IFSA[]> => {
    W3.Default = web3
    // console.log("write here...");

    if (typeof event.payload === 'string') {
      throw new Error('event.payload must be an object, not a string.')
    }

    if (Array.isArray(event.payload)) {
      throw new Error('event.payload must be an object, not an array.')
    }

    let params = await adapter.prepareFSAForStorage(event)

    let marshalledEvent = await adapter.marshal(
      event.type,
      params.keyType,
      params.valueType,
      params.keyValue,
      params.valueValue
    )

    // console.log('is event marshalled correctly: ', marshalledEvent)

    // console.log(marshalledEvent)

    let receipt = await store.writeEvent(
      marshalledEvent.eventType,
      marshalledEvent.keyType,
      marshalledEvent.valueType,
      marshalledEvent.key,
      marshalledEvent.value,
      W3.TC.txParamsDefaultDeploy(fromAddress, Utils.GAS_COSTS.WRITE_EVENT)
    )

    return adapter.extractEventsFromLogs(receipt.logs)
  }
}