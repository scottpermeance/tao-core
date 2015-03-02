<?php
/**  
 * This program is free software; you can redistribute it and/or
 * modify it under the terms of the GNU General Public License
 * as published by the Free Software Foundation; under version 2
 * of the License (non-upgradable).
 * 
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 * 
 * You should have received a copy of the GNU General Public License
 * along with this program; if not, write to the Free Software
 * Foundation, Inc., 51 Franklin Street, Fifth Floor, Boston, MA  02110-1301, USA.
 * 
 * Copyright (c) 2008-2010 (original work) Deutsche Institut für Internationale Pädagogische Forschung (under the project TAO-TRANSFER);
 *               2009-2012 (update and modification) Public Research Centre Henri Tudor (under the project TAO-SUSTAIN & TAO-DEV);
 *               2013-2015 (update and modification) Open Assessment Technologies SA;
 */

namespace oat\tao\test\helpers;

use oat\tao\test\TaoPhpUnitTestRunner;
use tao_helpers_Numeric;

class NumericHelperTestCase extends TaoPhpUnitTestRunner
{
    /**
     * 
     * @author Lionel Lecaque, lionel@taotesting.com
     */
    public function testParseFloat()
    {
        $this->assertEquals(10, tao_helpers_Numeric::parseFloat("10"));
        $this->assertEquals(10, tao_helpers_Numeric::parseFloat("10g"));
        $this->assertEquals(10.5, tao_helpers_Numeric::parseFloat("10.5"));
        $this->assertEquals(10.5, tao_helpers_Numeric::parseFloat("10,5"));
        $this->assertEquals(1105.5, tao_helpers_Numeric::parseFloat("1.105,5"));
    }
}
