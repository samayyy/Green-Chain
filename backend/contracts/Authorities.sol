// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

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
        uint _campaignId,
        string memory _latitude,
        string memory _longitude
    ) public view returns (address) {
        // uint authorityId = uint(
        //     keccak256(abi.encodePacked(block.timestamp, _campaignId))
        // ) % length;
        // find the nearest authority
        Location memory _location = Location(_latitude, _longitude);
        uint authorityIndex = findNearestLocation(
            getAuthoritiesLocation(),
            _location
        );
        return authorities[authorityIndex].addr;
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

    function getAuthoritiesLocation() public view returns (Location[] memory) {
        Location[] memory locations = new Location[](length);
        for (uint i = 0; i < length; i++) {
            locations[i] = authorities[i].location;
        }
        return locations;
    }

    // get the authority id from index
    function findNearestLocation(
        Location[] memory locations,
        Location memory currentLocation
    ) public pure returns (uint) {
        uint nearestIndex = 0;
        uint nearestDistance = 0;
        for (uint i = 0; i < locations.length; i++) {
            uint distance = calculateDistance(locations[i], currentLocation);
            if (i == 0 || distance < nearestDistance) {
                nearestIndex = i;
                nearestDistance = distance;
            }
        }
        return nearestIndex;
    }

    function calculateDistance(
        Location memory location1,
        Location memory location2
    ) internal pure returns (uint) {
        uint R = 6371; // Earth's radius in kilometers
        uint lat1 = parseCoordinate(location1.latitude);
        uint lon1 = parseCoordinate(location1.longitude);
        uint lat2 = parseCoordinate(location2.latitude);
        uint lon2 = parseCoordinate(location2.longitude);
        uint dLat = ((lat2 - lat1) * pi()) / 180;
        uint dLon = ((lon2 - lon1) * pi()) / 180;
        uint a = calculateSin(dLat / 2) *
            calculateSin(dLat / 2) +
            calculateCos((lat1 * pi()) / 180) *
            calculateCos((lat2 * pi()) / 180) *
            calculateSin(dLon / 2) *
            calculateSin(dLon / 2);
        uint c = 2 * atan2(sqrt(a), sqrt(1 - a));
        uint distance = R * c;
        return distance;
    }

    function parseCoordinate(
        string memory coordinate
    ) internal pure returns (uint) {
        bytes memory b = bytes(coordinate);
        uint decimalIndex = b.length;
        for (uint i = 0; i < b.length; i++) {
            if (b[i] == ".") {
                decimalIndex = i;
                break;
            }
        }
        uint integerPart = parseInt(b, decimalIndex);
        uint fractionalPart = parseInt(b, b.length - decimalIndex - 1);
        return
            integerPart *
            1000000000 +
            (fractionalPart * 1000000000) /
            (10 ** (b.length - decimalIndex - 1));
    }

    function parseInt(
        bytes memory b,
        uint decimalIndex
    ) internal pure returns (uint) {
        uint result = 0;
        for (uint i = 0; i < decimalIndex; i++) {
            result = result * 10 + uint(b[i]) - 48;
        }
        return result;
    }

    function pi() internal pure returns (uint) {
        return 314159265; // approximation of pi
    }

    function calculateSin(uint256 degrees) public pure returns (uint) {
        uint radians = (uint(degrees) * 3141592653589793238) /
            1800000000000000000; // convert degrees to radians
        uint result = 0;
        for (uint256 i = 0; i < 10; i++) {
            uint term = (uint(power(uint256(-1), i)) *
                uint(power(radians, 2 * i + 1))) / uint(factorial(2 * i + 1));
            result += term;
        }
        return result;
    }

    function calculateCos(uint256 degrees) public pure returns (uint) {
        uint radians = (uint(degrees) * 3141592653589793238) /
            1800000000000000000; // convert degrees to radians
        uint result = 0;
        for (uint256 i = 0; i < 10; i++) {
            uint term = (uint(power(uint256(-1), i)) *
                uint(power(radians, 2 * i))) / uint(factorial(2 * i));
            result += term;
        }
        return result;
    }

    // Calculates the square root of a given number using the Babylonian method
    function sqrt(uint x) public pure returns (uint y) {
        uint z = (x + 1) / 2;
        y = x;
        while (z < y) {
            y = z;
            z = (x / z + z) / 2;
        }
    }

    // Calculates the power of a given base to a given exponent
    function power(uint base, uint exponent) public pure returns (uint result) {
        result = 1;
        while (exponent > 0) {
            if (exponent % 2 == 1) {
                result *= base;
            }
            base *= base;
            exponent /= 2;
        }
    }

    // Calculates the factorial of a given number
    function factorial(uint n) public pure returns (uint result) {
        result = 1;
        for (uint i = 1; i <= n; i++) {
            result *= i;
        }
    }

    // Calculates the arctangent of the quotient of y and x, and returns the angle in radians
    function atan2(uint y, uint x) public pure returns (uint result) {
        if (x > 0) {
            result = atan(y / x);
        } else if (x < 0 && y >= 0) {
            result = atan(y / x) + uint(PI);
        } else if (x < 0 && y < 0) {
            result = atan(y / x) - uint(PI);
        } else if (x == 0 && y > 0) {
            result = uint(PI) / uint(2);
        } else if (x == 0 && y < 0) {
            result = uint(-PI) / uint(2);
        } else {
            result = 0;
        }
    }

    // Calculates the arctangent of a given number, and returns the angle in radians
    function atan(uint x) public pure returns (uint result) {
        bool negative = false;
        if (x < 0) {
            negative = true;
            x = -x;
        }
        if (x > uint(FIXED_1)) {
            result = uint(PI) / uint(2);
        } else {
            uint y = x;
            uint z = 0;
            for (uint i = 0; i < 5; i++) {
                y = (y * y) / uint(FIXED_1);
                z += (uint(2) ** uint(2 * i + 1) * y) / uint(2 * i + 1);
            }
            result = z;
        }
        if (negative) {
            result = -result;
        }
    }

    // Fixed-point arithmetic constants
    uint256 constant FIXED_1 = 0x080000000000000000000000000000000;
    uint256 constant PI =
        0x3243F6A8885A308D313198A2E03707344A4093822299F31D0082EFA98EC4E6C89;
}
