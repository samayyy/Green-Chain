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
        string location
    );

    event LogCampaignVerified(uint indexed _campaignId, string _status);

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
        string memory _location
    ) public {
        uint campaignId = length++;
        campaigns[campaignId] = Campaign(
            _name,
            _description,
            _imageProof,
            "pending",
            "",
            _location
        );
        userCampaigns[_userAddress].push(campaignId);
        emit LogCampaignCreated(
            campaignId,
            _name,
            _description,
            _imageProof,
            "pending",
            _location
        );
        // Authorities authoritiesContract = Authorities(
        //     "0x5B38Da6a701c568545dCfcB03FcB875f56beddC4"
        // );
        // address authority = authoritiesContract.call(
        //     bytes4(keccak256("assignCampaignToAuthority(uint256)")),
        //     campaignId
        // );
    }

    function verifyCampaign(uint _campaignId, string memory _status) public {
        Campaign storage campaign = campaigns[_campaignId];
        if (
            keccak256(abi.encodePacked(campaign.status)) ==
            keccak256(abi.encodePacked("pending"))
        ) {
            if (
                keccak256(abi.encodePacked(_status)) ==
                keccak256(abi.encodePacked("verified")) ||
                keccak256(abi.encodePacked(_status)) ==
                keccak256(abi.encodePacked("rejected"))
            ) {
                emit LogCampaignVerified(_campaignId, _status);
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

    function getUserPendingCampaigns(
        address _userAddress
    ) public view returns (uint[] memory) {
        uint[] memory pendingCampaigns = new uint[](
            userCampaigns[_userAddress].length
        );
        for (uint i = 0; i < userCampaigns[_userAddress].length; i++) {
            Campaign storage campaign = campaigns[
                userCampaigns[_userAddress][i]
            ];
            if (
                keccak256(abi.encodePacked(campaign.status)) ==
                keccak256(abi.encodePacked("pending"))
            ) {
                pendingCampaigns[i] = userCampaigns[_userAddress][i];
            }
        }
        return pendingCampaigns;
    }

    function getUserVerifiedCampaigns(
        address _userAddress
    ) public view returns (uint[] memory) {
        uint[] memory verifiedCampaigns = new uint[](
            userCampaigns[_userAddress].length
        );
        for (uint i = 0; i < userCampaigns[_userAddress].length; i++) {
            Campaign storage campaign = campaigns[
                userCampaigns[_userAddress][i]
            ];
            if (
                keccak256(abi.encodePacked(campaign.status)) ==
                keccak256(abi.encodePacked("pending"))
            ) {
                verifiedCampaigns[i] = userCampaigns[_userAddress][i];
            }
        }
        return verifiedCampaigns;
    }

    function getUserResolvedCampaigns(
        address _userAddress
    ) public view returns (uint[] memory) {
        uint[] memory resolvedCampaigns = new uint[](
            userCampaigns[_userAddress].length
        );
        for (uint i = 0; i < userCampaigns[_userAddress].length; i++) {
            Campaign storage campaign = campaigns[
                userCampaigns[_userAddress][i]
            ];
            if (
                keccak256(abi.encodePacked(campaign.status)) ==
                keccak256(abi.encodePacked("resolved"))
            ) {
                resolvedCampaigns[i] = userCampaigns[_userAddress][i];
            }
        }
        return resolvedCampaigns;
    }

    function getUserCompletedCampaigns(
        address _userAddress
    ) public view returns (uint[] memory) {
        uint[] memory completedCampaigns = new uint[](
            userCampaigns[_userAddress].length
        );
        for (uint i = 0; i < userCampaigns[_userAddress].length; i++) {
            Campaign storage campaign = campaigns[
                userCampaigns[_userAddress][i]
            ];
            if (
                keccak256(abi.encodePacked(campaign.status)) ==
                keccak256(abi.encodePacked("completed"))
            ) {
                completedCampaigns[i] = userCampaigns[_userAddress][i];
            }
        }
        return completedCampaigns;
    }

    function getUserNotCompletedCampaigns(
        address _userAddress
    ) public view returns (uint[] memory) {
        uint[] memory notCompletedCampaigns = new uint[](
            userCampaigns[_userAddress].length
        );
        for (uint i = 0; i < userCampaigns[_userAddress].length; i++) {
            Campaign storage campaign = campaigns[
                userCampaigns[_userAddress][i]
            ];
            if (
                keccak256(abi.encodePacked(campaign.status)) ==
                keccak256(abi.encodePacked("notCompleted"))
            ) {
                notCompletedCampaigns[i] = userCampaigns[_userAddress][i];
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
}

contract Authorities {
    struct Authority {
        address addr;
        string name;
        string location;
    }

    mapping(uint => Authority) public authorities;
    uint public length;

    function addAuthority(
        address _addr,
        string memory _name,
        string memory _location
    ) public {
        uint id = length++;
        authorities[id] = Authority(_addr, _name, _location);
    }

    function assignCampaignToAuthority(
        uint _campaignId
    ) public view returns (address) {
        uint authorityId = uint(
            keccak256(abi.encodePacked(block.timestamp, _campaignId))
        ) % length;
        return authorities[authorityId].addr;
    }
}
