import mqtt from 'mqtt';

console.log("connecting to mqtt!");
const client  = mqtt.connect('mqtt://127.0.0.1')

let callbacks = {};
//callbacks = {[topic]: [layer] : cb}

client.on('connect', function () {
  console.log("connected to mqtt!!");
})



//EITHER THE TOPIC (IE TOPIC/LAYER) OR THE MESSAGE NEEDS TO SAY WHICH LAYER IT COMES FROM!
client.on('message', (topic, message, pkt)=>{
  
    const msg = JSON.parse(message.toString());
    const {layer} = msg;

    for (const _layer of Object.keys(callbacks[topic])){
        console.log("checking", _layer, "against", layer)
        if (_layer==layer){
            callbacks[topic][_layer](_layer,msg);
        }
    }
})

export const unsubscribe = (topic, layer)=>{

    if (Object.keys(callbacks || {}).length <= 0){
        return;
    }

    callbacks = Object.keys(callbacks).reduce((acc, _topic)=>{
        if (_topic === topic){
            if (callbacks[_topic][layer]){
                if (Object.keys(callbacks[_topic]).length <= 1){
                    return acc; //get rid of this topic entirely if this is the last layer subscribed to it!
                }
             
                //otherwise just get rid of the layer within the topic
                return {
                    ...acc,
                    [_topic]: Object.keys(callbacks[_topic]).reduce((acc,_layer)=>{
                        if (_layer == layer)
                            return acc;
                        return {
                            ...acc,
                            [_layer] : callbacks[_topic][_layer]
                        }
                    },{})
                }
            }
        }
        return {
            ...acc,
            [_topic]: callbacks[_topic]
        }
    },{});

    //if there are now no layers subscribed to the topic, then remove
    if (!(callbacks[topic])){
        client.unsubscribe(topic, (err)=>{
            console.log("fully unsubscribed from topic", topic);
        }); 
    }
}

export const subscribe = (topic,layer, cb)=>{
 
    const subscribed = Object.keys(callbacks).indexOf(topic) != -1;
    
    if (!subscribed){ 
        client.subscribe(topic);
    }

    callbacks = {
        ...callbacks,
        [topic] : {
            ...(callbacks[topic] || {}),
            [layer] : cb
        }
    }
}

export const send = (topic, message)=>{
    client.publish(topic, message);
}
