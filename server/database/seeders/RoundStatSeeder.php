<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class RoundStatSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        //
        DB::table('round_stats')->insert([
            [
                'team_id' => 1,
                'round_id' => 1,
                'score' => 0
            ],
            [
                'team_id' => 2,
                'round_id' => 1,
                'score' => 0
            ],
            [
                'team_id' => 1,
                'round_id' => 2,
                'score' => 0
            ],
            [
                'team_id' => 2,
                'round_id' => 2,
                'score' => 0
            ],
            [
                'team_id' => 1,
                'round_id' => 3,
                'score' => 0
            ],
            [
                'team_id' => 2,
                'round_id' => 3,
                'score' => 0
            ],
        ]);
    }
}
