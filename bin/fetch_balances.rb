#!/usr/bin/env ruby

require "http"

contract_address = "0xc8f840a4a80417e590f0ea7b225c2fb177546c19"

transactions = JSON.parse(HTTP.get("http://api.etherscan.io/api?module=account&action=txlist&address=#{contract_address}&startblock=0&endblock=99999999&sort=asc&apikey=#{ENV.fetch("ETHERSCAN_API_KEY")}").body)["result"]

transfers = transactions.select { |t| t["input"]&.start_with?("0xa9059cbb") }
addresses = transfers.map { |t| t["input"][34, 40] }.uniq + ["9dc32c6f38f84d83018e64730736f61d4ea56d88"]
balances = addresses.map do |address|
  balance = JSON.parse(HTTP.get("https://api.etherscan.io/api?module=account&action=tokenbalance&contractaddress=#{contract_address}&address=0x#{address}&tag=latest&apikey=#{ENV.fetch("ETHERSCAN_API_KEY")}").body)["result"]
  # Original token had 8 decimal places, new one has 18.
  next if balance.to_i.zero?
  ["0x#{address}", balance.to_i * 10**10]
end.compact.to_h

puts balances.to_json
