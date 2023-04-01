// SPDX-License-Identifier: MIT
pragma solidity 0.8.19;

contract Case {
    struct Campaign {
        string name;
        string description;
        string imageProof;
        string status;
        string completionImageProof;
        string location;
        address assignedAuthority;
    }

    mapping(uint => Campaign) public campaigns;
    uint public length;
    mapping(address => uint[]) public userCampaigns;

    event LogCampaignCreated(
        uint indexed _campaignId,
        string _name,
        string _description,
        string _imageProof,
        string _status,
        string _location,
        address _assignedAuthority
    );

    event LogCampaignVerified(
        uint indexed _campaignId,
        string _status,
        address _assignedAuthority
    );

    event LogCampaignResolved(
        uint indexed _campaignId,
        string _status,
        string _completionImageProof,
        string location
    );

    event LogCampaignCompleted(
        uint indexed _campaignId,
        string _imageProof,
        string _completionImageProof,
        string _status
    );

    function createCampaign(
        address _userAddress,
        string memory _name,
        string memory _description,
        string memory _imageProof,
        string memory _location,
        Authorities _authoritiesContract
    ) public {
        uint campaignId = length++;
        address assignedAuthority = _authoritiesContract
            .assignCampaignToAuthority(campaignId);
        campaigns[campaignId] = Campaign(
            _name,
            _description,
            _imageProof,
            "pending",
            "",
            _location,
            assignedAuthority
        );
        userCampaigns[_userAddress].push(campaignId);
        emit LogCampaignCreated(
            campaignId,
            _name,
            _description,
            _imageProof,
            "pending",
            _location,
            assignedAuthority
        );
    }

    function verifyCampaign(uint _campaignId, string memory _status) public {
        Campaign storage campaign = campaigns[_campaignId];
        if (
            keccak256(abi.encodePacked(campaign.status)) ==
            keccak256(abi.encodePacked("pending"))
        ) {
            if (campaign.assignedAuthority == msg.sender) {
                if (
                    keccak256(abi.encodePacked(_status)) ==
                    keccak256(abi.encodePacked("verified")) ||
                    keccak256(abi.encodePacked(_status)) ==
                    keccak256(abi.encodePacked("rejected"))
                ) {
                    emit LogCampaignVerified(
                        _campaignId,
                        _status,
                        campaign.assignedAuthority
                    );
                }
            }
        }
    }

    function resolveCampaign(
        uint _campaignId,
        string memory _completionImageProof,
        string memory _location
    ) public {
        Campaign storage campaign = campaigns[_campaignId];
        if (
            keccak256(abi.encodePacked(campaign.status)) ==
            keccak256(abi.encodePacked("verified"))
        ) {
            if (campaign.assignedAuthority == msg.sender) {
                campaign.status = "resolved";
                campaign.completionImageProof = _completionImageProof;
                emit LogCampaignResolved(
                    _campaignId,
                    "resolved",
                    _completionImageProof,
                    _location
                );
            }
        }
    }

    function completeCampaign(uint _campaignId, string memory _status) public {
        Campaign storage campaign = campaigns[_campaignId];
        if (
            keccak256(abi.encodePacked(campaign.status)) ==
            keccak256(abi.encodePacked("resolved"))
        ) {
            if (
                keccak256(abi.encodePacked(_status)) ==
                keccak256(abi.encodePacked("completed")) ||
                keccak256(abi.encodePacked(_status)) ==
                keccak256(abi.encodePacked("notCompleted"))
            ) {
                emit LogCampaignCompleted(
                    _campaignId,
                    campaign.imageProof,
                    campaign.completionImageProof,
                    _status
                );
            }
        }
    }

    function getUserPendingCampaigns() public view returns (uint[] memory) {
        uint[] memory pendingCampaigns = new uint[](
            userCampaigns[msg.sender].length
        );
        for (uint i = 0; i < userCampaigns[msg.sender].length; i++) {
            Campaign storage campaign = campaigns[userCampaigns[msg.sender][i]];
            if (
                keccak256(abi.encodePacked(campaign.status)) ==
                keccak256(abi.encodePacked("pending"))
            ) {
                pendingCampaigns[i] = userCampaigns[msg.sender][i];
            }
        }
        return pendingCampaigns;
    }

    function getUserVerifiedCampaigns() public view returns (uint[] memory) {
        uint[] memory verifiedCampaigns = new uint[](
            userCampaigns[msg.sender].length
        );
        for (uint i = 0; i < userCampaigns[msg.sender].length; i++) {
            Campaign storage campaign = campaigns[userCampaigns[msg.sender][i]];
            if (
                keccak256(abi.encodePacked(campaign.status)) ==
                keccak256(abi.encodePacked("pending"))
            ) {
                verifiedCampaigns[i] = userCampaigns[msg.sender][i];
            }
        }
        return verifiedCampaigns;
    }

    function getUserResolvedCampaigns() public view returns (uint[] memory) {
        uint[] memory resolvedCampaigns = new uint[](
            userCampaigns[msg.sender].length
        );
        for (uint i = 0; i < userCampaigns[msg.sender].length; i++) {
            Campaign storage campaign = campaigns[userCampaigns[msg.sender][i]];
            if (
                keccak256(abi.encodePacked(campaign.status)) ==
                keccak256(abi.encodePacked("resolved"))
            ) {
                resolvedCampaigns[i] = userCampaigns[msg.sender][i];
            }
        }
        return resolvedCampaigns;
    }

    function getUserCompletedCampaigns() public view returns (uint[] memory) {
        uint[] memory completedCampaigns = new uint[](
            userCampaigns[msg.sender].length
        );
        for (uint i = 0; i < userCampaigns[msg.sender].length; i++) {
            Campaign storage campaign = campaigns[userCampaigns[msg.sender][i]];
            if (
                keccak256(abi.encodePacked(campaign.status)) ==
                keccak256(abi.encodePacked("completed"))
            ) {
                completedCampaigns[i] = userCampaigns[msg.sender][i];
            }
        }
        return completedCampaigns;
    }

    function getUserNotCompletedCampaigns()
        public
        view
        returns (uint[] memory)
    {
        uint[] memory notCompletedCampaigns = new uint[](
            userCampaigns[msg.sender].length
        );
        for (uint i = 0; i < userCampaigns[msg.sender].length; i++) {
            Campaign storage campaign = campaigns[userCampaigns[msg.sender][i]];
            if (
                keccak256(abi.encodePacked(campaign.status)) ==
                keccak256(abi.encodePacked("notCompleted"))
            ) {
                notCompletedCampaigns[i] = userCampaigns[msg.sender][i];
            }
        }
        return notCompletedCampaigns;
    }

    function getAllPendingCampaigns() public view returns (uint[] memory) {
        uint[] memory pendingCampaigns = new uint[](length);
        for (uint i = 0; i < length; i++) {
            Campaign storage campaign = campaigns[i];
            if (
                keccak256(abi.encodePacked(campaign.status)) ==
                keccak256(abi.encodePacked("pending"))
            ) {
                pendingCampaigns[i] = i;
            }
        }
        return pendingCampaigns;
    }

    function getAllVerifiedCampaigns() public view returns (uint[] memory) {
        uint[] memory verifiedCampaigns = new uint[](length);
        for (uint i = 0; i < length; i++) {
            Campaign storage campaign = campaigns[i];
            if (
                keccak256(abi.encodePacked(campaign.status)) ==
                keccak256(abi.encodePacked("verified"))
            ) {
                verifiedCampaigns[i] = i;
            }
        }
        return verifiedCampaigns;
    }

    function getAllResolvedCampaigns() public view returns (uint[] memory) {
        uint[] memory resolvedCampaigns = new uint[](length);
        for (uint i = 0; i < length; i++) {
            Campaign storage campaign = campaigns[i];
            if (
                keccak256(abi.encodePacked(campaign.status)) ==
                keccak256(abi.encodePacked("resolved"))
            ) {
                resolvedCampaigns[i] = i;
            }
        }
        return resolvedCampaigns;
    }

    function getAllCompletedCampaigns() public view returns (uint[] memory) {
        uint[] memory completedCampaigns = new uint[](length);
        for (uint i = 0; i < length; i++) {
            Campaign storage campaign = campaigns[i];
            if (
                keccak256(abi.encodePacked(campaign.status)) ==
                keccak256(abi.encodePacked("completed"))
            ) {
                completedCampaigns[i] = i;
            }
        }
        return completedCampaigns;
    }

    // get All Pending Campaigns of a authority
    function getAuthorityPendingCampaigns()
        public
        view
        returns (uint[] memory)
    {
        uint[] memory pendingCampaigns = new uint[](length);
        for (uint i = 0; i < length; i++) {
            Campaign storage campaign = campaigns[i];
            if (
                keccak256(abi.encodePacked(campaign.status)) ==
                keccak256(abi.encodePacked("pending")) &&
                campaign.assignedAuthority == msg.sender
            ) {
                pendingCampaigns[i] = i;
            }
        }
        return pendingCampaigns;
    }

    // get All Verified Campaigns of a authority
    function getAuthorityVerifiedCampaigns()
        public
        view
        returns (uint[] memory)
    {
        uint[] memory verifiedCampaigns = new uint[](length);
        for (uint i = 0; i < length; i++) {
            Campaign storage campaign = campaigns[i];
            if (
                keccak256(abi.encodePacked(campaign.status)) ==
                keccak256(abi.encodePacked("verified")) &&
                campaign.assignedAuthority == msg.sender
            ) {
                verifiedCampaigns[i] = i;
            }
        }
        return verifiedCampaigns;
    }

    // get All Resolved Campaigns of a authority
    function getAuthorityResolvedCampaigns()
        public
        view
        returns (uint[] memory)
    {
        uint[] memory resolvedCampaigns = new uint[](length);
        for (uint i = 0; i < length; i++) {
            Campaign storage campaign = campaigns[i];
            if (
                keccak256(abi.encodePacked(campaign.status)) ==
                keccak256(abi.encodePacked("resolved")) &&
                campaign.assignedAuthority == msg.sender
            ) {
                resolvedCampaigns[i] = i;
            }
        }
        return resolvedCampaigns;
    }

    // get All Completed Campaigns of a authority
    function getAuthorityCompletedCampaigns()
        public
        view
        returns (uint[] memory)
    {
        uint[] memory completedCampaigns = new uint[](length);
        for (uint i = 0; i < length; i++) {
            Campaign storage campaign = campaigns[i];
            if (
                keccak256(abi.encodePacked(campaign.status)) ==
                keccak256(abi.encodePacked("completed")) &&
                campaign.assignedAuthority == msg.sender
            ) {
                completedCampaigns[i] = i;
            }
        }
        return completedCampaigns;
    }

    // get All Not Completed Campaigns of a authority
    function getAuthorityNotCompletedCampaigns()
        public
        view
        returns (uint[] memory)
    {
        uint[] memory notCompletedCampaigns = new uint[](length);
        for (uint i = 0; i < length; i++) {
            Campaign storage campaign = campaigns[i];
            if (
                keccak256(abi.encodePacked(campaign.status)) ==
                keccak256(abi.encodePacked("notCompleted")) &&
                campaign.assignedAuthority == msg.sender
            ) {
                notCompletedCampaigns[i] = i;
            }
        }
        return notCompletedCampaigns;
    }
}

contract Authorities {
    struct Authority {
        address addr;
        string name;
        string location;
    }

    mapping(uint => Authority) public authorities;
    uint public length;

    function addAuthority(string memory _name, string memory _location) public {
        uint id = length++;
        authorities[id] = Authority(msg.sender, _name, _location);
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
        returns (string memory, string memory)
    {
        for (uint i = 0; i < length; i++) {
            if (authorities[i].addr == msg.sender) {
                return (authorities[i].name, authorities[i].location);
            }
        }
    }
}
