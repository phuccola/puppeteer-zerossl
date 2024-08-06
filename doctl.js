const start = 11
const end = 15

function doctl(input, index){
  console.log(
  `doctl compute droplet create
  --context ${input.context}
  --ssh-keys ${input.sshKeys}
  --image ${input.image}
  --size ${input.size}
  --region ${input.region}
  --vpc-uuid ${input.vpcUuid}
  --enable-monitoring
  do4-01-varnish${index}`)
  console.log()
}

const input = {
  context: 'vphap6898',
  sshKeys: '42972259',
  image: '161850000',
  size: 's-1vcpu-1gb-35gb-intel',
  region: 'sgp1',
  vpcUuid: '5fc44afa-5676-41d1-838f-b51e50e73134',
  enable: 'enable-monitoring'
}

for (let i = start; i <= end; i++) {
  doctl(input, i)
}
