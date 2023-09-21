<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
class RoundSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        //
        DB::table('rounds')->insert([
            [
                'name' => 1,
            ],
            [
                'name' => 2,
            ],
            [
                'name' => 3
            ],
        ]);

    }
}
