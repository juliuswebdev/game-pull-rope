<?php

namespace App\Http\Controllers;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;
use Laravel\Lumen\Routing\Controller as BaseController;

use App\Models\User;
use App\Models\UserTeam;
use App\Models\Round;
use App\Models\RoundStat;

class GameController extends BaseController
{
    //
    public function storeUser(Request $request) {
        $user = User::create([
            'name' => $request->input('name')
        ]);
        $message = ['data' => $user, 'success' => 1];
        return response()->json($message, 200);
    }

    public function storeUsers(Request $request) {
        $users = UserTeam::insert($request->input('users'));
        $message = ['data' => $users, 'success' => 1];
        return response()->json($message, 200);
    }

    public function userTeam(Request $request) {
        $user_team = UserTeam::where('user_id', $request->input('user_id'))->first();
        $message = ['data' => $user_team, 'success' => 1];
        return response()->json($message, 200);
    }

    public function getUsers() {
        $users = User::all();
        $message = ['data' => $users, 'success' => 1];
        return response()->json($message, 200);
    }

    public function getRound() {
        $round = Round::where('status', 1)->orderBy('id', 'DESC')->first();
        $message = ['data' => $round, 'success' => 1];
        return response()->json($message, 200);
    }

    public function startRound(Request $request) {
        $round_id = $request->input('round_id');
        $round = Round::find($round_id);
        $round->status = 1;
        $round->update();
        $message = ['data' => $round, 'success' => 1];
        return response()->json($message, 200);
    }

    public function userTap(Request $request) {
        $team_id = $request->input('team_id');
        $round_id = $request->input('round_id');
        $round_stat = RoundStat::where('round_stats.team_id', $team_id)->where('round_stats.round_id', $round_id)
            ->leftJoin('rounds', 'rounds.id', '=', 'round_stats.round_id')
            ->where('rounds.status', 1)
            ->update([
                'score'=> DB::raw('score+1'),
            ]);


    }

}

