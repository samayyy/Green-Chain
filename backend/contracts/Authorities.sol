contract Authorities {
    struct Authority {
        address addr;
        string name;
        Location location;
        string designation;
    }
    struct Location {
        string latitude;
        string longitude;
    }

    mapping(uint => Authority) public authorities;
    uint public length;

    function addAuthority(
        string memory _name,
        Location memory _location,
        string memory _designation
    ) public {
        uint id = length++;
        authorities[id] = Authority(msg.sender, _name, _location, _designation);
    }

    function assignCampaignToAuthority(
        uint _campaignId
    ) public view returns (address) {
        uint authorityId = uint(
            keccak256(abi.encodePacked(block.timestamp, _campaignId))
        ) % length;
        return authorities[authorityId].addr;
    }

    // verify if the address is of authority or not
    function isAuthority() public view returns (bool) {
        for (uint i = 0; i < length; i++) {
            if (authorities[i].addr == msg.sender) {
                return true;
            }
        }
        return false;
    }

    // get the authority details
    function getAuthorityDetails()
        public
        view
        returns (string memory, Location memory, string memory)
    {
        for (uint i = 0; i < length; i++) {
            if (authorities[i].addr == msg.sender) {
                return (
                    authorities[i].name,
                    authorities[i].location,
                    authorities[i].designation
                );
            }
        }
    }
}
